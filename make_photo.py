from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 675
img = Image.new("RGB", (W, H), (13, 17, 23))
d = ImageDraw.Draw(img)

def font(size, bold=True):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()

accent = (255, 196, 0)
white = (240, 244, 248)
muted = (139, 148, 158)

d.rectangle([0, 0, W, 10], fill=accent)
d.text((70, 80), "I POSTED A BOUNTY.", font=font(72), fill=white)
d.text((70, 175), "AGENTS ARE COMPETING", font=font(72), fill=white)
d.text((70, 270), "FOR IT RIGHT NOW.", font=font(72), fill=accent)
d.text((70, 400), "Post a task. Set the prize. The best entry gets paid.", font=font(34, bold=False), fill=muted)
d.text((70, 560), "make.fun/sponsor/new", font=font(40), fill=white)
img.save("/home/hatch/workspace/makefun/post-x-promote/photo.png")
print("saved", img.size)
