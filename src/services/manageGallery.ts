import { supabase } from "@/lib/supabase"

/* =====================================================
 TYPES
===================================================== */

export interface GallerySection {
  id?: string
  floor?: string
  wing?: string
  section_name?: string
  description?: string
  created_at?: string
  note?: string
}

export interface GalleryImage {
  id?: string
  section_id: string
  image_url: string
  caption?: string
  display_order?: number
  uploaded_by?: string
  created_at?: string
}


/* =====================================================
 GALLERY SECTIONS CRUD
===================================================== */

// GET ALL SECTIONS
export const getGallerySections = async () => {
  const { data, error } = await supabase
    .from('gallery_sections')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}


// GET SINGLE SECTION
export const getGallerySectionById = async (id: string) => {
  const { data, error } = await supabase
    .from('gallery_sections')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}


// CREATE SECTION
export const createGallerySection = async (section: GallerySection) => {
  const { data, error } = await supabase
    .from('gallery_sections')
    .insert(section)
    .select()
    .single()

  if (error) throw error
  return data
}


// UPDATE SECTION
export const updateGallerySection = async (id: string, section: GallerySection) => {
  const { data, error } = await supabase
    .from('gallery_sections')
    .update(section)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}


// DELETE SECTION
export const deleteGallerySection = async (id: string) => {
  const { error } = await supabase
    .from('gallery_sections')
    .delete()
    .eq('id', id)

  if (error) throw error
}



/* =====================================================
 GALLERY IMAGES CRUD
===================================================== */

// GET IMAGES BY SECTION
export const getImagesBySection = async (sectionId: string) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('section_id', sectionId)
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}


// ADD IMAGE
export const addGalleryImage = async (image: GalleryImage) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .insert(image)
    .select()
    .single()

  if (error) throw error
  return data
}


// UPDATE IMAGE
export const updateGalleryImage = async (id: string, image: Partial<GalleryImage>) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .update(image)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}


// DELETE IMAGE
export const deleteGalleryImage = async (id: string) => {
  const { error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id)

  if (error) throw error
}



/* =====================================================
 IMAGE ORDERING
===================================================== */

export const updateImageOrder = async (id: string, order: number) => {
  const { data, error } = await supabase
    .from('gallery_images')
    .update({ display_order: order })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}