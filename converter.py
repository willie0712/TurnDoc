import os
import sys
import uuid
import json
import subprocess
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from PIL import Image

# ============================================================
# TurnDoc 轉換核心
# ============================================================

class TurnDocConverter:
    def __init__(self, output_dir='./outputs'):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    def word_to_pdf(self, input_path):
        output_filename = f'{uuid.uuid4()}.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        try:
            cmd = ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        except:
            cmd = ['soffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        generated = os.path.join(self.output_dir, f'{base_name}.pdf')
        if os.path.exists(generated):
            os.rename(generated, output_path)
        return output_path

    def pdf_to_word(self, input_path):
        output_filename = f'{uuid.uuid4()}.docx'
        output_path = os.path.join(self.output_dir, output_filename)
        try:
            cmd = ['libreoffice', '--headless', '--convert-to', 'docx', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        except:
            cmd = ['soffice', '--headless', '--convert-to', 'docx', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        generated = os.path.join(self.output_dir, f'{base_name}.docx')
        if os.path.exists(generated):
            os.rename(generated, output_path)
        return output_path

    def ppt_to_pdf(self, input_path):
        output_filename = f'{uuid.uuid4()}.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        try:
            cmd = ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        except:
            cmd = ['soffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        generated = os.path.join(self.output_dir, f'{base_name}.pdf')
        if os.path.exists(generated):
            os.rename(generated, output_path)
        return output_path

    def excel_to_pdf(self, input_path):
        output_filename = f'{uuid.uuid4()}.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        try:
            cmd = ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        except:
            cmd = ['soffice', '--headless', '--convert-to', 'pdf', '--outdir', self.output_dir, input_path]
            subprocess.run(cmd, check=True, capture_output=True)
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        generated = os.path.join(self.output_dir, f'{base_name}.pdf')
        if os.path.exists(generated):
            os.rename(generated, output_path)
        return output_path

    def merge_pdfs(self, input_paths):
        merger = PdfMerger()
        for path in input_paths:
            merger.append(path)
        output_filename = f'{uuid.uuid4()}.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        merger.write(output_path)
        merger.close()
        return output_path

    def compress_pdf(self, input_path):
        reader = PdfReader(input_path)
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        output_filename = f'{uuid.uuid4()}_compressed.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        with open(output_path, 'wb') as f:
            writer.write(f)
        return output_path

    def pdf_to_images(self, input_path, output_format='PNG'):
        from pdf2image import convert_from_path
        images = convert_from_path(input_path)
        output_paths = []
        for i, img in enumerate(images):
            output_filename = f'{uuid.uuid4()}_page_{i+1}.{output_format.lower()}'
            output_path = os.path.join(self.output_dir, output_filename)
            img.save(output_path, output_format.upper())
            output_paths.append(output_path)
        return output_paths

    def images_to_pdf(self, image_paths):
        images = []
        for path in image_paths:
            img = Image.open(path)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            images.append(img)
        output_filename = f'{uuid.uuid4()}.pdf'
        output_path = os.path.join(self.output_dir, output_filename)
        images[0].save(output_path, save_all=True, append_images=images[1:])
        return output_path

    def convert_image(self, input_path, output_format='PNG'):
        img = Image.open(input_path)
        output_filename = f'{uuid.uuid4()}.{output_format.lower()}'
        output_path = os.path.join(self.output_dir, output_filename)
        if output_format.upper() == 'JPG' and img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            if img.mode == 'RGBA':
                background.paste(img, mask=img.split()[-1])
            else:
                background.paste(img)
            img = background
        img.save(output_path, format=output_format.upper())
        return output_path

    def compress_image(self, input_path, quality=80, output_format=None):
        img = Image.open(input_path)
        if output_format is None:
            output_format = img.format or 'JPEG'
        output_filename = f'{uuid.uuid4()}_compressed.{output_format.lower()}'
        output_path = os.path.join(self.output_dir, output_filename)
        fmt = output_format.upper()
        if fmt in ('JPEG', 'JPG'):
            img.save(output_path, format='JPEG', quality=quality, optimize=True)
        elif fmt == 'PNG':
            img.save(output_path, format='PNG', compress_level=6, optimize=True)
        elif fmt == 'WEBP':
            img.save(output_path, format='WEBP', quality=quality)
        else:
            img.save(output_path, quality=quality)
        return output_path

    def split_gif(self, input_path, output_format='PNG'):
        from PIL import ImageSequence
        img = Image.open(input_path)
        output_paths = []
        for i, frame in enumerate(ImageSequence.Iterator(img)):
            output_filename = f'{uuid.uuid4()}_frame_{i+1}.{output_format.lower()}'
            output_path = os.path.join(self.output_dir, output_filename)
            frame.save(output_path, format=output_format)
            output_paths.append(output_path)
        return output_paths


# ============================================================
# CLI 入口
# ============================================================

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--tool', required=True)
    parser.add_argument('--input', nargs='+', required=True)
    parser.add_argument('--output', default='./outputs')
    parser.add_argument('--format', default='PNG')
    args = parser.parse_args()

    converter = TurnDocConverter(output_dir=args.output)

    try:
        if args.tool == 'word-to-pdf':
            out = converter.word_to_pdf(args.input[0])
        elif args.tool == 'pdf-to-word':
            out = converter.pdf_to_word(args.input[0])
        elif args.tool == 'ppt-to-pdf':
            out = converter.ppt_to_pdf(args.input[0])
        elif args.tool == 'excel-to-pdf':
            out = converter.excel_to_pdf(args.input[0])
        elif args.tool == 'merge':
            out = converter.merge_pdfs(args.input)
        elif args.tool == 'compress':
            out = converter.compress_pdf(args.input[0])
        elif args.tool == 'pdf-to-image':
            out = converter.pdf_to_images(args.input[0], args.format)
        elif args.tool == 'image-to-pdf':
            out = converter.images_to_pdf(args.input)
        elif args.tool == 'image-convert':
            out = converter.convert_image(args.input[0], args.format)
        elif args.tool == 'image-compress':
            out = converter.compress_image(args.input[0], 80, args.format)
        elif args.tool == 'gif-split':
            out = converter.split_gif(args.input[0], args.format)
        else:
            print(json.dumps({'error': f'不支援工具: {args.tool}'}))
            sys.exit(1)

        if isinstance(out, list):
            print(json.dumps(out))
        else:
            print(json.dumps([out]))
    except Exception as e:
        print(json.dumps({'error': str(e)}), file=sys.stderr)
        sys.exit(1)