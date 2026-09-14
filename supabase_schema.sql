-- ==============================================================================
-- SUPABASE SCHEMA: Vintage Lens Shooting Manual - Purchase Info System
-- ==============================================================================
-- Hướng dẫn: Copy và dán toàn bộ đoạn SQL này vào Supabase SQL Editor và nhấn "RUN".
-- ==============================================================================

-- 1. Tạo bảng lens_purchases lưu thông tin mua sắm cho từng ống kính
CREATE TABLE IF NOT EXISTS public.lens_purchases (
    lens_id TEXT PRIMARY KEY,                       -- ID duy nhất của lens (VD: 'vn-takumar-50-14', 'fi-nikkor-105-25')
    price TEXT,                                     -- Giá mua (VD: '1.800.000 đ', '75 €', '3.2tr')
    seller TEXT,                                    -- Người bán / Nơi mua (VD: 'Group Nikon Vintage VN', 'Tori.fi', 'eBay')
    purchase_date TEXT,                             -- Ngày mua (VD: '2024-05-12' hoặc text)
    notes TEXT,                                     -- Ghi chú tình trạng lens, phụ kiện, số serial, ngàm chuyển...
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tạo index cho lens_id để tối ưu tốc độ truy vấn
CREATE INDEX IF NOT EXISTS idx_lens_purchases_lens_id ON public.lens_purchases (lens_id);

-- 3. Bật Row Level Security (RLS)
ALTER TABLE public.lens_purchases ENABLE ROW LEVEL SECURITY;

-- 4. Tạo Policies cho phép app đọc và ghi dữ liệu (Anonymous Access / Public)
-- Cho phép đọc tất cả bản ghi
DROP POLICY IF EXISTS "Allow public read access to lens_purchases" ON public.lens_purchases;
CREATE POLICY "Allow public read access to lens_purchases"
    ON public.lens_purchases
    FOR SELECT
    USING (true);

-- Cho phép thêm mới bản ghi
DROP POLICY IF EXISTS "Allow public insert access to lens_purchases" ON public.lens_purchases;
CREATE POLICY "Allow public insert access to lens_purchases"
    ON public.lens_purchases
    FOR INSERT
    WITH CHECK (true);

-- Cho phép cập nhật bản ghi
DROP POLICY IF EXISTS "Allow public update access to lens_purchases" ON public.lens_purchases;
CREATE POLICY "Allow public update access to lens_purchases"
    ON public.lens_purchases
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Cho phép xóa bản ghi
DROP POLICY IF EXISTS "Allow public delete access to lens_purchases" ON public.lens_purchases;
CREATE POLICY "Allow public delete access to lens_purchases"
    ON public.lens_purchases
    FOR DELETE
    USING (true);

-- 5. Kích hoạt Supabase Realtime (tuỳ chọn - nếu muốn đồng bộ tức thì đa thiết bị)
ALTER PUBLICATION supabase_realtime ADD TABLE public.lens_purchases;

-- 6. Trigger tự động cập nhật trường updated_at khi có chỉnh sửa
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.lens_purchases;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.lens_purchases
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Thông báo hoàn tất
COMMENT ON TABLE public.lens_purchases IS 'Bảng lưu trữ thông tin mua hàng và tình trạng của bộ sưu tập ống kính Vintage Lens';
