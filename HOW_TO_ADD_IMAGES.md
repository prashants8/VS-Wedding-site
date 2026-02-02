# How to Add Your Wedding Images

## ✅ The Problem
The website is working, but images are showing placeholders because the image files haven't been added yet.

## 📸 How to Add Images

### Step 1: Prepare Your Images
- Make sure your images are in **JPG** or **PNG** format
- Recommended size: 1920x1080px or larger for best quality
- Optimize images if they're very large (keep under 2MB each)

### Step 2: Add Hero Image (Main Couple Photo)
1. Take your favorite couple photo (like the ones you sent)
2. Save it as: `public/images/couple/couple-main.jpg`
3. **Important**: The filename must be exactly `couple-main.jpg`

### Step 3: Add Gallery Images
1. Take 3-6 of your favorite couple photos
2. Save them as:
   - `public/images/gallery/gallery-1.jpg`
   - `public/images/gallery/gallery-2.jpg`
   - `public/images/gallery/gallery-3.jpg`
   - (Add more if you want: `gallery-4.jpg`, `gallery-5.jpg`, etc.)

### Step 4: Add Event Images (Optional)
For each event, add a photo:
- `public/images/events/tilak.jpg` - For Shubh Tilak event
- `public/images/events/vratbandh.jpg` - For Vratbandh event
- `public/images/events/wedding.jpg` - For Wedding ceremony
- `public/images/events/vidai.jpg` - For Bidai ceremony

### Step 5: Refresh Your Browser
After adding images:
1. Save the image files in the correct folders
2. Refresh your browser at `http://localhost:3000`
3. The images should now appear!

## 📁 Folder Structure
```
public/
  images/
    couple/
      couple-main.jpg  ← Add your main hero photo here
    gallery/
      gallery-1.jpg    ← Add gallery photos here
      gallery-2.jpg
      gallery-3.jpg
    events/
      tilak.jpg        ← Add event photos here (optional)
      vratbandh.jpg
      wedding.jpg
      vidai.jpg
```

## 💡 Quick Tips
- **File names must match exactly** (case-sensitive)
- If an image doesn't appear, check:
  1. Is the filename correct?
  2. Is it in the right folder?
  3. Is it a valid image file (JPG/PNG)?
- The website will show a placeholder if images are missing (this is normal until you add them)

## 🎨 Current Status
- ✅ Website is running at http://localhost:3000
- ✅ All text is updated with your wedding details
- ⏳ Waiting for you to add images

Once you add the images, refresh the page and everything will look perfect!
