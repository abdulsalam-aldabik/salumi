# Project Photos Guide

## Overview
The portfolio now supports a photo gallery feature for each project. Projects can have multiple photos displayed in a beautiful slideshow modal.

## How to Add Photos

### Single Photo
Add a `photos` array with one image:

```typescript
{
  id: 2,
  title: "My Project",
  // ... other fields
  image: "/projects/my-project.jpg",
  photos: ["/projects/my-project.jpg"],
}
```

### Multiple Photos
Add a `photos` array with multiple images:

```typescript
{
  id: 1,
  title: "My Project",
  // ... other fields
  image: "/projects/my-project.jpg",
  photos: [
    "/projects/my-project-1.jpg",
    "/projects/my-project-2.jpg",
    "/projects/my-project-3.jpg",
    "/projects/my-project-4.jpg"
  ],
}
```

### No Photos
If you don't add a `photos` field or leave it empty, the Photos button won't appear:

```typescript
{
  id: 3,
  title: "My Project",
  // ... other fields
  image: "/projects/my-project.jpg",
  // No photos field - button won't show
}
```

## Photo Gallery Features

1. **Photo Button**: Shows "Photos (X)" with the count of photos
2. **Full-Screen Modal**: Click to open a beautiful full-screen gallery
3. **Navigation**: 
   - Arrow buttons to navigate between photos
   - Thumbnail strip at the bottom
   - Click thumbnails to jump to specific photos
4. **Counter**: Shows current photo position (e.g., "2 / 5")
5. **Keyboard Support**: 
   - Left/Right arrows to navigate
   - ESC to close (works with clicking outside or X button)

## File Organization

Place all project photos in: `public/projects/`

Example structure:
```
public/
  projects/
    autonomous-car.jpg
    autonomous-car-2.jpg
    jarvis-1.jpg
    jarvis-2.jpg
    jarvis-3.jpg
    smart-home.jpg
```

## Best Practices

1. **Image Names**: Use descriptive names with project prefix
2. **Image Size**: Optimize images (recommended max 1920x1080)
3. **Formats**: Use `.jpg` for photos, `.png` for screenshots with text
4. **Order**: First photo in the array will be shown first
5. **Main Image**: The `image` field is still used for the card header background
