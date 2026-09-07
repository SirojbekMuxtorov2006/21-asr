-- ============================================================================
-- Buyurtma raqamini avtomatik qo'yish (idempotent tuzatish)
--
-- Muammo: jonli bazada `orders.order_number` trigger'i yo'q edi. Frontend esa
-- bo'sh satr ('') yuborardi — birinchi buyurtma saqlanib, keyingilari
-- `order_number` unique cheklovga urilib xato berardi.
-- ============================================================================

CREATE SEQUENCE IF NOT EXISTS public.order_number_seq START 1;

CREATE OR REPLACE FUNCTION public.assign_order_number() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := '21ASR-' || to_char(now(), 'YYYY') || '-' ||
      lpad(nextval('public.order_number_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END; $$;

REVOKE EXECUTE ON FUNCTION public.assign_order_number() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS orders_number ON public.orders;
CREATE TRIGGER orders_number BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.assign_order_number();

-- Eski, raqamsiz qolgan buyurtmalarga raqam beriladi.
UPDATE public.orders
SET order_number = '21ASR-' || to_char(created_at, 'YYYY') || '-' ||
    lpad(nextval('public.order_number_seq')::text, 6, '0')
WHERE order_number IS NULL OR order_number = '';

-- Sequence'ni mavjud eng katta raqamdan keyin davom ettiramiz.
SELECT setval(
  'public.order_number_seq',
  GREATEST(
    (SELECT COALESCE(MAX(NULLIF(regexp_replace(order_number, '^21ASR-\d{4}-', ''), '')::bigint), 0)
     FROM public.orders
     WHERE order_number ~ '^21ASR-\d{4}-\d+$'),
    1
  )
);
