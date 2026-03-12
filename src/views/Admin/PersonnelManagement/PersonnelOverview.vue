<template>
  <div class="flex h-screen w-full overflow-hidden bg-[#f7f5f0]">
    <Sidebar />

    <main class="flex-1 overflow-y-auto">
<<<<<<< HEAD
=======

>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
      <!-- ===== HEADER ===== -->
      <header class="page-header">
        <div class="header-left">
          <div class="header-breadcrumb">
            <span>Admin</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>Personnel</span>
<<<<<<< HEAD
          </div>
          <h1 class="header-title">Library <span class="text-yellow-500">Personnel</span></h1>
          <p class="header-sub">Manage and view library staff information and assignments</p>
        </div>
      </header>

      <!-- ===== MAIN CONTENT ===== -->
      <div class="px-6 sm:px-10 lg:px-16 py-10 pb-20 max-w-6xl mx-auto">
        <!-- ===== FEATURED (HEAD) ===== -->
        <div v-if="featuredStaff" class="featured-wrapper mb-24">
          <div class="sr-item flex items-center gap-3 mb-10 justify-center">
            <div class="label-line"></div>
            <span class="label-text">University Librarian</span>
            <div class="label-line"></div>
=======
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
          </div>
          <h1 class="header-title">Library <span class="text-yellow-500">Personnel</span></h1>
          <p class="header-sub">Manage and view library staff information and assignments</p>
        </div>
        <div class="header-right" v-if="isAdmin">
          <span class="admin-hero-pill">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Mode Active
          </span>
        </div>
      </header>

<<<<<<< HEAD
          <div class="sr-item featured-card" :class="{ 'admin-card': isAdmin }">
            <div class="featured-accent-bar"></div>

            <!-- Photo -->
            <div class="featured-photo-wrap">
              <div
                class="absolute inset-0 rounded-full border-4 shadow-md"
                style="background-color: #0d2b0f; border-color: #66bb6a"
              ></div>
              <img
                :src="featuredStaff!.imageUrl || featuredStaff!.image"
                :alt="featuredStaff!.name"
                class="featured-photo"
              />

              <!-- Camera icon overlay — admin only -->
              <template v-if="isAdmin">
                <label
                  class="photo-overlay"
                  :for="`photo-${featuredStaff!.localId}`"
                  title="Change photo"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span class="photo-overlay-label">Change Photo</span>
                </label>
                <input
                  :id="`photo-${featuredStaff!.localId}`"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handlePhotoUpload(e, featuredStaff!)"
                />
              </template>
            </div>

            <!-- Info -->
            <div class="featured-info">
              <span class="featured-badge">Head of Library Services</span>

              <!-- Inline edit fields -->
              <div v-if="editingId === featuredStaff!.localId" class="edit-fields">
                <input
                  v-model="editForm.name"
                  placeholder="Full Name"
                  class="edit-input edit-input-lg"
                />
                <input
                  v-model="editForm.subtitle"
                  placeholder="Title / Designation"
                  class="edit-input"
                />
                <input
                  v-model="editForm.position"
                  placeholder="Position (optional)"
                  class="edit-input"
                />
                <div class="edit-actions">
                  <button @click="saveEdit(featuredStaff!)" class="btn-save" :disabled="saving">
                    <span v-if="saving" class="loader-sm"></span>
                    <span v-else>Save Changes</span>
                  </button>
                  <button @click="cancelEdit" class="btn-cancel">Cancel</button>
                </div>
              </div>

              <!-- Normal display -->
              <template v-else>
                <h2 class="featured-name">{{ featuredStaff!.name }}</h2>
                <p class="featured-subtitle">{{ featuredStaff!.subtitle }}</p>
                <div class="featured-divider"></div>
                <p v-if="featuredStaff!.position" class="featured-position">
                  {{ featuredStaff!.position }}
                </p>
                <button
                  v-if="isAdmin"
                  @click="startEdit(featuredStaff!)"
                  class="btn-edit-inline mt-3"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Details
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- ===== STAFF SECTION LABEL ===== -->
        <div class="sr-item flex items-center gap-3 mb-12">
          <div class="label-line"></div>
          <span class="label-text">Library Staff</span>
          <div class="label-line flex-1"></div>
          <button v-if="isAdmin" @click="openAddModal" class="btn-add">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Staff
          </button>
        </div>

        <!-- ===== STAFF GRID ===== -->
        <div class="staff-grid">
          <div
            v-for="(person, index) in otherStaff"
            :key="person.localId"
            class="sr-card staff-card"
            :class="{ 'admin-card': isAdmin }"
            :style="{ transitionDelay: (index % 2) * 0.12 + 's' }"
          >
            <!-- Photo -->
            <div class="staff-photo-wrap">
              <div
                class="absolute inset-0 rounded-full border-4 shadow-md"
                style="background-color: #0d2b0f; border-color: #66bb6a"
              ></div>
              <img :src="person.imageUrl || person.image" :alt="person.name" class="staff-photo" />

              <!-- Camera icon overlay — admin only -->
              <template v-if="isAdmin">
                <label class="photo-overlay" :for="`photo-${person.localId}`" title="Change photo">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  :id="`photo-${person.localId}`"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handlePhotoUpload(e, person)"
                />
              </template>
            </div>

            <!-- Info -->
            <div class="staff-info">
              <!-- Inline edit -->
              <template v-if="editingId === person.localId">
                <input
                  v-model="editForm.name"
                  placeholder="Full Name"
                  class="edit-input edit-input-sm"
                />
                <input
                  v-model="editForm.subtitle"
                  placeholder="Title / Designation"
                  class="edit-input edit-input-sm"
                />
                <input
                  v-model="editForm.position"
                  placeholder="Position (optional)"
                  class="edit-input edit-input-sm"
                />
                <div class="edit-actions mt-1">
                  <button @click="saveEdit(person)" class="btn-save btn-save-sm" :disabled="saving">
                    <span v-if="saving" class="loader-sm"></span>
                    <span v-else>Save</span>
                  </button>
                  <button @click="cancelEdit" class="btn-cancel btn-cancel-sm">Cancel</button>
                </div>
              </template>

              <!-- Normal display -->
              <template v-else>
                <h3 class="staff-name">{{ person.name }}</h3>
                <div class="staff-rule"></div>
                <p class="staff-subtitle">{{ person.subtitle }}</p>
                <p v-if="person.position" class="staff-position">{{ person.position }}</p>

                <!-- Edit / Delete — admin only -->
                <div v-if="isAdmin" class="card-actions">
                  <button @click="startEdit(person)" class="btn-icon">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button @click="confirmDelete(person)" class="btn-icon btn-icon-danger">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </template>
            </div>
=======
      <!-- ===== MAIN CONTENT ===== -->
      <div class="px-6 sm:px-10 lg:px-16 py-10 pb-20 max-w-6xl mx-auto">

        <!-- ===== LOADING ===== -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-4">
          <div class="loader-ring"></div>
          <p class="loading-text">Loading personnel...</p>
        </div>

        <template v-else>
          <!-- ===== FEATURED (HEAD) ===== -->
          <div v-if="featuredStaff" class="featured-wrapper mb-24">
            <div class="sr-item flex items-center gap-3 mb-10 justify-center">
              <div class="label-line"></div>
              <span class="label-text">University Librarian</span>
              <div class="label-line"></div>
            </div>

            <div class="sr-item featured-card" :class="{ 'admin-card': isAdmin }">
              <div class="featured-accent-bar"></div>

              <!-- Photo -->
              <div class="featured-photo-wrap">
                <div class="absolute inset-0 rounded-full border-4 shadow-md"
                  style="background-color: #0d2b0f; border-color: #66bb6a"></div>
                <img
                  :src="featuredStaff.image_url || defaultAvatar"
                  :alt="fullName(featuredStaff)"
                  class="featured-photo"
                />
                <template v-if="isAdmin">
                  <label class="photo-overlay" :for="`photo-${featuredStaff.id}`" title="Change photo">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="photo-overlay-label">Change Photo</span>
                  </label>
                  <input :id="`photo-${featuredStaff.id}`" type="file" accept="image/*" class="hidden"
                    @change="(e) => handlePhotoUpload(e, featuredStaff!)" />
                </template>
              </div>

              <!-- Info -->
              <div class="featured-info">
                <span class="featured-badge">Head of Library Services</span>

                <!-- Edit form -->
                <div v-if="editingId === featuredStaff.id" class="edit-fields">
                  <input v-model="editForm.first_name" placeholder="First Name" class="edit-input edit-input-lg" />
                  <input v-model="editForm.last_name" placeholder="Last Name" class="edit-input edit-input-lg" />
                  <input v-model="editForm.professional_titles" placeholder="Professional Titles (e.g. RL, LPT)" class="edit-input" />
                  <input v-model="editForm.position" placeholder="Position (optional)" class="edit-input" />
                  <div class="edit-actions">
                    <button @click="saveEdit(featuredStaff!)" class="btn-save" :disabled="saving">
                      <span v-if="saving" class="loader-sm"></span>
                      <span v-else>Save Changes</span>
                    </button>
                    <button @click="cancelEdit" class="btn-cancel">Cancel</button>
                  </div>
                </div>

                <!-- Display -->
                <template v-else>
                  <h2 class="featured-name">{{ fullName(featuredStaff) }}</h2>
                  <p class="featured-subtitle">{{ featuredStaff.professional_titles }}</p>
                  <div class="featured-divider"></div>
                  <p v-if="featuredStaff.position" class="featured-position">{{ featuredStaff.position }}</p>
                  <button v-if="isAdmin" @click="startEdit(featuredStaff!)" class="btn-edit-inline mt-3">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Details
                  </button>
                </template>
              </div>
            </div>
          </div>

          <!-- ===== STAFF SECTION LABEL ===== -->
          <div class="sr-item flex items-center gap-3 mb-12">
            <div class="label-line"></div>
            <span class="label-text">Library Staff</span>
            <div class="label-line flex-1"></div>
            <button v-if="isAdmin" @click="openAddModal" class="btn-add">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Add Staff
            </button>
          </div>

          <!-- ===== STAFF GRID ===== -->
          <div v-if="otherStaff.length > 0" class="staff-grid">
            <div
              v-for="(person, index) in otherStaff"
              :key="person.id"
              class="sr-card staff-card"
              :class="{ 'admin-card': isAdmin }"
              :style="{ transitionDelay: (index % 2) * 0.12 + 's' }"
            >
              <!-- Photo -->
              <div class="staff-photo-wrap">
                <div class="absolute inset-0 rounded-full border-4 shadow-md"
                  style="background-color: #0d2b0f; border-color: #66bb6a"></div>
                <img :src="person.image_url || defaultAvatar" :alt="fullName(person)" class="staff-photo" />
                <template v-if="isAdmin">
                  <label class="photo-overlay" :for="`photo-${person.id}`" title="Change photo">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                  <input :id="`photo-${person.id}`" type="file" accept="image/*" class="hidden"
                    @change="(e) => handlePhotoUpload(e, person)" />
                </template>
              </div>

              <!-- Info -->
              <div class="staff-info">
                <!-- Edit form -->
                <template v-if="editingId === person.id">
                  <input v-model="editForm.first_name" placeholder="First Name" class="edit-input edit-input-sm" />
                  <input v-model="editForm.last_name" placeholder="Last Name" class="edit-input edit-input-sm" />
                  <input v-model="editForm.professional_titles" placeholder="Professional Titles (e.g. RL)" class="edit-input edit-input-sm" />
                  <input v-model="editForm.position" placeholder="Position (optional)" class="edit-input edit-input-sm" />
                  <div class="edit-actions mt-1">
                    <button @click="saveEdit(person)" class="btn-save btn-save-sm" :disabled="saving">
                      <span v-if="saving" class="loader-sm"></span>
                      <span v-else>Save</span>
                    </button>
                    <button @click="cancelEdit" class="btn-cancel btn-cancel-sm">Cancel</button>
                  </div>
                </template>

                <!-- Display -->
                <template v-else>
                  <h3 class="staff-name">{{ fullName(person) }}</h3>
                  <div class="staff-rule"></div>
                  <p class="staff-subtitle">{{ person.professional_titles }}</p>
                  <p v-if="person.position" class="staff-position">{{ person.position }}</p>
                  <div v-if="isAdmin" class="card-actions">
                    <button @click="startEdit(person)" class="btn-icon">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="confirmDelete(person)" class="btn-icon btn-icon-danger">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- ===== EMPTY STATE ===== -->
          <div v-else class="flex flex-col items-center py-20 gap-3 opacity-50">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#0d2b0f">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
            <p class="text-sm font-semibold tracking-widest uppercase text-[#0d2b0f]">No staff found</p>
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
          </div>
        </template>
      </div>
    </main>
  </div>

  <!-- ===== SCROLL TO TOP ===== -->
  <Transition name="fade">
    <button v-if="showScrollTop" @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:opacity-90"
      style="background: #0d2b0f" aria-label="Scroll to top">
      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 11l7-7 7 7" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 17l7-7 7 7" />
      </svg>
    </button>
  </Transition>

  <!-- ===== ADD STAFF MODAL ===== -->
  <Transition name="modal">
    <div v-if="showAddModal" class="modal-backdrop" @click.self="closeAddModal">
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-header-accent"></div>
          <h3 class="modal-title">Add New Staff</h3>
          <button @click="closeAddModal" class="modal-close">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="modal-photo-section">
          <div class="modal-photo-wrap">
            <div
              class="absolute inset-0 rounded-full border-4"
              style="background-color: #0d2b0f; border-color: #66bb6a"
            ></div>
            <img :src="newForm.previewUrl || defaultAvatar" alt="Preview" class="modal-photo" />
            <label
              for="modal-photo-input"
              class="photo-overlay"
              style="opacity: 1; cursor: pointer"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
<<<<<<< HEAD
            <input
              id="modal-photo-input"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleNewPhotoSelect"
            />
=======
            <input id="modal-photo-input" type="file" accept="image/*" class="hidden" @change="handleNewPhotoSelect" />
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
          </div>
          <p class="modal-photo-hint">Click to upload photo</p>
        </div>
        <div class="modal-fields">
          <div class="field-group">
<<<<<<< HEAD
            <label class="field-label">Full Name <span class="required">*</span></label>
            <input
              v-model="newForm.name"
              placeholder="e.g. JUAN DELA CRUZ, RL"
              class="modal-input"
            />
          </div>
          <div class="field-group">
            <label class="field-label">Title / Designation <span class="required">*</span></label>
            <input
              v-model="newForm.subtitle"
              placeholder="e.g. Readers Services Librarian"
              class="modal-input"
            />
=======
            <label class="field-label">First Name <span class="required">*</span></label>
            <input v-model="newForm.first_name" placeholder="e.g. JUAN" class="modal-input" />
          </div>
          <div class="field-group">
            <label class="field-label">Last Name <span class="required">*</span></label>
            <input v-model="newForm.last_name" placeholder="e.g. DELA CRUZ" class="modal-input" />
          </div>
          <div class="field-group">
            <label class="field-label">Professional Titles <span class="field-optional">(optional)</span></label>
            <input v-model="newForm.professional_titles" placeholder="e.g. RL, LPT" class="modal-input" />
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
          </div>
          <div class="field-group">
            <label class="field-label"
              >Position <span class="field-optional">(optional)</span></label
            >
            <input
              v-model="newForm.position"
              placeholder="e.g. Head, Circulation Services"
              class="modal-input"
            />
          </div>
          <div class="field-group">
            <label class="field-label">Role</label>
            <select v-model="newForm.role" class="modal-input">
              <option value="staff">Library Staff</option>
              <option value="head">University Librarian (Head)</option>
            </select>
          </div>
        </div>
        <p v-if="modalError" class="modal-error">{{ modalError }}</p>
        <div class="modal-footer">
          <button @click="closeAddModal" class="btn-cancel">Cancel</button>
          <button @click="addStaff" class="btn-save" :disabled="saving">
            <span v-if="saving" class="loader-sm"></span>
            <span v-else>Add Staff Member</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- ===== DELETE CONFIRM MODAL ===== -->
  <Transition name="modal">
    <div v-if="deleteTarget" class="modal-backdrop" @click.self="deleteTarget = null">
      <div class="modal-box modal-box-sm">
        <div class="modal-header">
          <div class="modal-header-accent modal-header-accent-danger"></div>
          <h3 class="modal-title">Confirm Delete</h3>
          <button @click="deleteTarget = null" class="modal-close">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="px-6 py-5">
          <p class="delete-confirm-text">
            Are you sure you want to remove
            <strong>{{ fullName(deleteTarget) }}</strong>
            from the personnel list? This cannot be undone.
          </p>
        </div>
        <div class="modal-footer">
          <button @click="deleteTarget = null" class="btn-cancel">Cancel</button>
          <button @click="deleteStaff" class="btn-delete" :disabled="saving">
            <span v-if="saving" class="loader-sm"></span>
            <span v-else>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- ===== TOAST ===== -->
  <Transition name="toast">
    <div
      v-if="toast.show"
      class="toast"
      :class="toast.type === 'error' ? 'toast-error' : 'toast-success'"
    >
      <svg
        v-if="toast.type === 'success'"
        class="w-4 h-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <svg
        v-else
        class="w-4 h-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {{ toast.message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
<<<<<<< HEAD

// ─── Static local images ──────────────────────────────────────────────────────
import cora from '@/assets/images/personnelpage/cora.png'
import mercy from '@/assets/images/personnelpage/mercy.png'
import marie from '@/assets/images/personnelpage/marie.png'
import berongoy from '@/assets/images/personnelpage/berongoy.png'
import jorge from '@/assets/images/personnelpage/jorge.png'
import warren from '@/assets/images/personnelpage/warren.png'
import malyn from '@/assets/images/personnelpage/malyn.png'
import sabrena from '@/assets/images/personnelpage/sabrena.png'
import jasmin from '@/assets/images/personnelpage/jasmin.png'
import lagaras from '@/assets/images/personnelpage/lagaras.png'

// ─── Firebase ─────────────────────────────────────────────────────────────────
import { db, storage, auth } from '@/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'

// ─── Types ────────────────────────────────────────────────────────────────────
interface MergedStaff {
  localId: string
  firestoreId?: string
  storagePath?: string
  name: string
  subtitle: string
  position?: string
  image: string
  imageUrl?: string
  role: 'head' | 'staff'
  order: number
}

// ─── Static seed ─────────────────────────────────────────────────────────────
const STATIC_STAFF: Omit<MergedStaff, 'firestoreId' | 'storagePath' | 'imageUrl'>[] = [
  {
    localId: 'local-1',
    name: 'MARIA CORAZON L. TERCERA, RL',
    subtitle: 'University Librarian',
    position: 'Head, Library Services',
    image: cora,
    role: 'head',
    order: 0,
  },
  {
    localId: 'local-2',
    name: 'MERCY G. REYES, RL',
    subtitle: 'Technical Librarian I',
    image: mercy,
    role: 'staff',
    order: 0,
  },
  {
    localId: 'local-3',
    name: 'ANN MARIE MONTE DE RAMOS, RL',
    subtitle: 'Readers Services Librarian',
    image: marie,
    role: 'staff',
    order: 1,
  },
  {
    localId: 'local-4',
    name: 'JEHOVENN T. BERONGOY',
    subtitle: 'Audio-Visual Technician',
    image: berongoy,
    role: 'staff',
    order: 2,
  },
  {
    localId: 'local-5',
    name: 'JORGE V. BAUTISTA',
    subtitle: 'Public Assistance & Complaints Desk Officer',
    image: jorge,
    role: 'staff',
    order: 3,
  },
  {
    localId: 'local-6',
    name: 'JOHN WARREN S. BATONDO, LPT',
    subtitle: 'Administrative Aide VI Clerk III',
    image: warren,
    role: 'staff',
    order: 4,
  },
  {
    localId: 'local-7',
    name: 'MALYN C. TRAYA',
    subtitle: 'Technical Service Staff',
    image: malyn,
    role: 'staff',
    order: 5,
  },
  {
    localId: 'local-8',
    name: 'SABRENA MAE ELLEVERA',
    subtitle: 'Periodical Service Staff',
    image: sabrena,
    role: 'staff',
    order: 6,
  },
  {
    localId: 'local-9',
    name: 'JASMIN D. PADILLA',
    subtitle: 'Library Learning Spaces Staff',
    image: jasmin,
    role: 'staff',
    order: 7,
  },
  {
    localId: 'local-10',
    name: 'JHOGIE A. LAGARAS',
    subtitle: 'Circulation Services Staff',
    image: lagaras,
    role: 'staff',
    order: 8,
  },
]

const defaultAvatar =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzBkMmIwZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzgiIHI9IjE4IiBmaWxsPSIjNjZiYjZhIi8+PHBhdGggZD0iTTEwIDkwIGMwLTIyIDEzLTM1IDQwLTM1czQwIDEzIDQwIDM1IiBmaWxsPSIjNjZiYjZhIi8+PC9zdmc+'

const staff = ref<MergedStaff[]>([...STATIC_STAFF] as MergedStaff[])
const isAdmin = ref(false)
const saving = ref(false)
const editingId = ref<string | null>(null)
const showAddModal = ref(false)
const deleteTarget = ref<MergedStaff | null>(null)
const modalError = ref('')
const showScrollTop = ref(false)

const editForm = ref({ name: '', subtitle: '', position: '' })
const newForm = ref({
  name: '',
  subtitle: '',
  position: '',
  role: 'staff' as 'head' | 'staff',
  previewUrl: '',
  file: null as File | null,
=======
import { supabase } from '@/lib/supabase'
import { personnelService } from '@/services/personnelService'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PersonnelRow {
  id:                  string
  first_name:          string | null
  last_name:           string | null
  professional_titles: string | null
  position:            string | null
  role:                string | null
  image_url:           string | null
  is_active:           boolean | null
  created_at:          string | null
  updated_at:          string | null
}

// ─── Default avatar ───────────────────────────────────────────────────────────
const defaultAvatar =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzBkMmIwZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzgiIHI9IjE4IiBmaWxsPSIjNjZiYjZhIi8+PHBhdGggZD0iTTEwIDkwIGMwLTIyIDEzLTM1IDQwLTM1czQwIDEzIDQwIDM1IiBmaWxsPSIjNjZiYjZhIi8+PC9zdmc+'

// ─── State ────────────────────────────────────────────────────────────────────
const staff         = ref<PersonnelRow[]>([])
const loading       = ref(true)
const isAdmin       = ref(false)
const saving        = ref(false)
const editingId     = ref<string | null>(null)
const showAddModal  = ref(false)
const deleteTarget  = ref<PersonnelRow | null>(null)
const modalError    = ref('')
const showScrollTop = ref(false)

const editForm = ref({
  first_name: '', last_name: '', professional_titles: '', position: '', role: 'staff',
})

const newForm = ref({
  first_name: '', last_name: '', professional_titles: '',
  position: '', role: 'staff',
  previewUrl: '', file: null as File | null,
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
})

const toast = ref({ show: false, message: '', type: 'success' as 'success' | 'error' })
let toastTimer: ReturnType<typeof setTimeout> | null = null
let realtimeChannel: ReturnType<typeof supabase.channel> | null = null
let observer: IntersectionObserver | null = null

<<<<<<< HEAD
const featuredStaff = computed<MergedStaff | undefined>(() =>
  staff.value.find((s) => s.role === 'head'),
)
const otherStaff = computed<MergedStaff[]>(() =>
  staff.value.filter((s) => s.role === 'staff').sort((a, b) => a.order - b.order),
)

function mergeWithFirestore(docs: { id: string; data: any }[]) {
  const merged: MergedStaff[] = STATIC_STAFF.map((s) => ({ ...s }) as MergedStaff)
  for (const d of docs) {
    const match = merged.find((m) => m.role === d.data.role && m.order === d.data.order)
    if (match) {
      match.firestoreId = d.id
      match.name = d.data.name ?? match.name
      match.subtitle = d.data.subtitle ?? match.subtitle
      match.position = d.data.position ?? match.position
      match.imageUrl = d.data.imageUrl || undefined
      match.storagePath = d.data.storagePath || undefined
    } else {
      merged.push({
        localId: d.id,
        firestoreId: d.id,
        name: d.data.name ?? '',
        subtitle: d.data.subtitle ?? '',
        position: d.data.position ?? '',
        image: defaultAvatar,
        imageUrl: d.data.imageUrl || undefined,
        storagePath: d.data.storagePath || undefined,
        role: d.data.role ?? 'staff',
        order: d.data.order ?? 999,
      })
    }
  }
  staff.value = merged
=======
// ─── Helper: full display name ────────────────────────────────────────────────
function fullName(person: PersonnelRow | null): string {
  if (!person) return ''
  const last   = person.last_name?.trim().toUpperCase()  ?? ''
  const first  = person.first_name?.trim().toUpperCase() ?? ''
  const titles = person.professional_titles?.trim()      ?? ''
  const name   = [last, first].filter(Boolean).join(', ')
  return titles ? `${name}, ${titles}` : name
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}

// ─── Computed ─────────────────────────────────────────────────────────────────
const featuredStaff = computed<PersonnelRow | undefined>(() =>
  staff.value.find((s) => s.role?.toLowerCase() === 'head' && s.is_active !== false)
)
const otherStaff = computed<PersonnelRow[]>(() =>
  staff.value.filter((s) => s.role?.toLowerCase() !== 'head' && s.is_active !== false)
)

// ─── Fetch ────────────────────────────────────────────────────────────────────
async function fetchPersonnel() {
  loading.value = true
  try {
    const data  = await personnelService.getAll()
    staff.value = (data ?? []) as PersonnelRow[]
  } catch (err: any) {
    console.error('Failed to fetch personnel:', err.message)
  } finally {
    loading.value = false
    setTimeout(initObserver, 100)
  }
}

// ─── Real-time ────────────────────────────────────────────────────────────────
function subscribeToStaff() {
  realtimeChannel = supabase
    .channel('personnel-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'personnel' }, () => {
      fetchPersonnel()
    })
    .subscribe()
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
function checkAuth() {
  if (window.location.pathname.includes('/admin')) isAdmin.value = true
  supabase.auth.onAuthStateChange((_event: string, session: { user: unknown } | null) => {
    isAdmin.value = !!session?.user || window.location.pathname.includes('/admin')
  })
}

<<<<<<< HEAD
function startEdit(person: MergedStaff) {
  editingId.value = person.localId
  editForm.value = { name: person.name, subtitle: person.subtitle, position: person.position ?? '' }
}
function cancelEdit() {
  editingId.value = null
=======
// ─── Edit ─────────────────────────────────────────────────────────────────────
function startEdit(person: PersonnelRow) {
  editingId.value = person.id
  editForm.value  = {
    first_name:          person.first_name          ?? '',
    last_name:           person.last_name           ?? '',
    professional_titles: person.professional_titles ?? '',
    position:            person.position            ?? '',
    role:                person.role                ?? 'staff',
  }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}

async function saveEdit(person: PersonnelRow) {
  if (!editForm.value.first_name.trim() || !editForm.value.last_name.trim()) return
  saving.value = true
  try {
<<<<<<< HEAD
    const payload = {
      name: editForm.value.name.trim().toUpperCase(),
      subtitle: editForm.value.subtitle.trim(),
      position: editForm.value.position.trim(),
      role: person.role,
      order: person.order,
    }
    if (person.firestoreId) {
      await updateDoc(doc(db, 'personnel', person.firestoreId), payload)
    } else {
      await addDoc(collection(db, 'personnel'), { ...payload, imageUrl: '', storagePath: '' })
    }
=======
    await personnelService.update(person.id, {
      first_name:          editForm.value.first_name.trim().toUpperCase(),
      last_name:           editForm.value.last_name.trim().toUpperCase(),
      professional_titles: editForm.value.professional_titles.trim(),
      position:            editForm.value.position.trim(),
      role:                editForm.value.role,
      updated_at:          new Date().toISOString(),
    })
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
    editingId.value = null
    showToast('Changes saved.')
  } catch (err: any) {
    showToast('Failed to save changes.', 'error')
    console.error(err)
  } finally {
    saving.value = false
  }
}

// ─── Add ──────────────────────────────────────────────────────────────────────
async function addStaff() {
  modalError.value = ''
  if (!newForm.value.first_name.trim() || !newForm.value.last_name.trim()) {
    modalError.value = 'First name and last name are required.'
    return
  }
  saving.value = true
  try {
<<<<<<< HEAD
    let imageUrl = '',
      storagePath = ''
    if (newForm.value.file) {
      const res = await uploadPhoto(
        newForm.value.file,
        `personnel/${Date.now()}_${newForm.value.file.name}`,
      )
      imageUrl = res.url
      storagePath = res.path
    }
    const newEntryCount = staff.value.filter(
      (s) => s.role === newForm.value.role && s.order >= 1000,
    ).length
    await addDoc(collection(db, 'personnel'), {
      name: newForm.value.name.trim().toUpperCase(),
      subtitle: newForm.value.subtitle.trim(),
      position: newForm.value.position.trim(),
      role: newForm.value.role,
      order: 1000 + newEntryCount,
      imageUrl,
      storagePath,
=======
    let imageUrl = ''
    if (newForm.value.file) {
      const res = await uploadPhoto(newForm.value.file, `personnel/${Date.now()}_${newForm.value.file.name}`)
      imageUrl  = res.url
    }
    await personnelService.create({
      first_name:          newForm.value.first_name.trim().toUpperCase(),
      last_name:           newForm.value.last_name.trim().toUpperCase(),
      professional_titles: newForm.value.professional_titles.trim(),
      position:            newForm.value.position.trim(),
      role:                newForm.value.role,
      image_url:           imageUrl || null,
      is_active:           true,
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
    })
    closeAddModal()
    showToast('Staff member added.')
  } catch (err: any) {
    modalError.value = 'Failed to add staff. Please try again.'
    console.error(err)
  } finally {
    saving.value = false
  }
}

<<<<<<< HEAD
function confirmDelete(person: MergedStaff) {
  deleteTarget.value = person
}
=======
// ─── Delete ───────────────────────────────────────────────────────────────────
function confirmDelete(person: PersonnelRow) { deleteTarget.value = person }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd

async function deleteStaff() {
  if (!deleteTarget.value) return
  saving.value = true
  try {
    // Remove photo from storage if exists
    if (deleteTarget.value.image_url) {
      const path = deleteTarget.value.image_url.split('/personnel-photos/')[1]
      if (path) await supabase.storage.from('personnel-photos').remove([path]).catch(() => {})
    }
    await personnelService.delete(deleteTarget.value.id)
    deleteTarget.value = null
    showToast('Staff member removed.')
  } catch (err: any) {
    showToast('Failed to delete.', 'error')
    console.error(err)
  } finally {
    saving.value = false
  }
}

// ─── Photo upload ─────────────────────────────────────────────────────────────
async function uploadPhoto(file: File, path: string): Promise<{ url: string; path: string }> {
  const { error } = await supabase.storage.from('personnel-photos').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from('personnel-photos').getPublicUrl(path)
  return { url: data.publicUrl, path }
}

<<<<<<< HEAD
async function handlePhotoUpload(event: Event, person: MergedStaff) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
=======
async function handlePhotoUpload(event: Event, person: PersonnelRow) {
  const file = (event.target as HTMLInputElement).files?.[0]
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
  if (!file) return
  saving.value = true
  try {
    const path = `personnel/${Date.now()}_${file.name}`
    const { url } = await uploadPhoto(file, path)
<<<<<<< HEAD
    if (person.storagePath) {
      await deleteObject(storageRef(storage, person.storagePath)).catch(() => {})
    }
    const payload = { imageUrl: url, storagePath: path }
    if (person.firestoreId) {
      await updateDoc(doc(db, 'personnel', person.firestoreId), payload)
    } else {
      await addDoc(collection(db, 'personnel'), {
        name: person.name,
        subtitle: person.subtitle,
        position: person.position ?? '',
        role: person.role,
        order: person.order,
        ...payload,
      })
=======
    // Delete old photo if exists
    if (person.image_url) {
      const oldPath = person.image_url.split('/personnel-photos/')[1]
      if (oldPath) await supabase.storage.from('personnel-photos').remove([oldPath]).catch(() => {})
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
    }
    await personnelService.update(person.id, { image_url: url, updated_at: new Date().toISOString() })
    showToast('Photo updated.')
  } catch (err: any) {
    showToast('Failed to upload photo.', 'error')
    console.error(err)
  } finally {
    saving.value = false
    ;(event.target as HTMLInputElement).value = ''
  }
}

function handleNewPhotoSelect(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  newForm.value.file = file
  newForm.value.previewUrl = URL.createObjectURL(file)
}

// ─── Modal helpers ────────────────────────────────────────────────────────────
function openAddModal() {
<<<<<<< HEAD
  newForm.value = {
    name: '',
    subtitle: '',
    position: '',
    role: 'staff',
    previewUrl: '',
    file: null,
  }
=======
  newForm.value    = { first_name: '', last_name: '', professional_titles: '', position: '', role: 'staff', previewUrl: '', file: null }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
  modalError.value = ''
  showAddModal.value = true
}
function closeAddModal() {
  showAddModal.value = false
  if (newForm.value.previewUrl) URL.revokeObjectURL(newForm.value.previewUrl)
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(message: string, type: 'success' | 'error' = 'success') {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = { show: true, message, type }
  toastTimer = setTimeout(() => {
    toast.value.show = false
  }, 3200)
}

<<<<<<< HEAD
function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
=======
// ─── Scroll / Observer ───────────────────────────────────────────────────────
function handleScroll() { showScrollTop.value = window.scrollY > 300 }
function scrollToTop()  { window.scrollTo({ top: 0, behavior: 'smooth' }) }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd

function initObserver() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        e.isIntersecting ? e.target.classList.add('in-view') : e.target.classList.remove('in-view')
      }),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.sr-item, .sr-card').forEach((el) => observer!.observe(el))
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchPersonnel()
  subscribeToStaff()
  checkAuth()
  window.addEventListener('scroll', handleScroll)
  setTimeout(initObserver, 100)
})
onUnmounted(() => {
  if (realtimeChannel) supabase.removeChannel(realtimeChannel)
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.page-header {
<<<<<<< HEAD
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 36px 40px 28px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.08);
  background: #f5f3ef;
}
.header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
}
.header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.4);
}
.header-breadcrumb svg {
  width: 12px;
  height: 12px;
  opacity: 0.4;
=======
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 36px 40px 28px; border-bottom: 1px solid rgba(13,43,15,0.08); background: #f5f3ef;
}
.header-left  { display: flex; flex-direction: column; gap: 6px; }
.header-right { display: flex; align-items: center; gap: 12px; padding-top: 8px; }
.header-breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(13,43,15,0.4);
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}
.header-title {
<<<<<<< HEAD
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #0d2b0f;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.header-sub {
  font-size: 0.82rem;
  color: rgba(13, 43, 15, 0.5);
  font-weight: 400;
  margin-top: 2px;
}

.admin-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0d2b0f;
  background: #f9a825;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(249, 168, 37, 0.4);
=======
  font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 900;
  color: #0d2b0f; line-height: 1.1; letter-spacing: -0.01em;
}
.header-sub { font-size: 0.82rem; color: rgba(13,43,15,0.5); font-weight: 400; margin-top: 2px; }
.admin-hero-pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.58rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
  color: #0d2b0f; background: #f9a825; padding: 6px 14px; border-radius: 20px;
  box-shadow: 0 2px 8px rgba(249,168,37,0.4);
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}

/* Loading */
@keyframes spin { to { transform: rotate(360deg); } }
.loader-ring {
  width: 40px; height: 40px; border-radius: 50%;
  border: 3px solid rgba(13,43,15,0.12); border-top-color: #0d2b0f;
  animation: spin 0.7s linear infinite;
}
.loading-text {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: rgba(13,43,15,0.45);
}

.label-line {
  height: 1px;
  width: 40px;
  background: linear-gradient(to right, #0d2b0f, rgba(13, 43, 15, 0.15));
}
.label-text {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  color: #0d2b0f;
  text-transform: uppercase;
  white-space: nowrap;
}

.featured-wrapper {
  animation: fadeUp 0.7s ease both;
}
.featured-card {
<<<<<<< HEAD
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 48px;
  background: #ffffff;
  border: 1px solid rgba(13, 43, 15, 0.08);
  border-radius: 4px;
  padding: 48px 52px;
  box-shadow: 0 4px 40px rgba(13, 43, 15, 0.07);
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
=======
  position: relative; display: flex; flex-direction: row; align-items: center;
  gap: 48px; background: #ffffff; border: 1px solid rgba(13,43,15,0.08);
  border-radius: 4px; padding: 48px 52px; box-shadow: 0 4px 40px rgba(13,43,15,0.07);
  overflow: hidden; transition: border-color 0.3s ease, box-shadow 0.3s ease;
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}
.admin-card {
  border-color: rgba(249, 168, 37, 0.25);
  box-shadow:
    0 4px 40px rgba(13, 43, 15, 0.07),
    0 0 0 2px rgba(249, 168, 37, 0.08);
}
.featured-accent-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #f9a825, #1b5e20);
}
.featured-photo-wrap {
<<<<<<< HEAD
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: visible;
=======
  position: relative; flex-shrink: 0; width: 160px; height: 160px; border-radius: 50%; overflow: visible;
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}
.featured-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 192px;
  height: 224px;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s ease;
}
.featured-photo:hover {
  transform: translateX(-50%) scale(1.05);
}
.featured-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.featured-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0d2b0f;
  background: #f9a825;
  padding: 3px 10px;
  border-radius: 2px;
  width: fit-content;
}
.featured-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0d2b0f;
  line-height: 1.2;
  letter-spacing: 0.03em;
}
.featured-subtitle {
  font-size: 0.85rem;
  color: #1b5e20;
  font-style: italic;
}
.featured-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, #f9a825, rgba(249, 168, 37, 0.2));
  border-radius: 2px;
}
.featured-position {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.5);
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.staff-card {
<<<<<<< HEAD
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  background: #ffffff;
  border: 1px solid rgba(13, 43, 15, 0.07);
  border-radius: 4px;
  padding: 24px 28px;
  box-shadow: 0 2px 16px rgba(13, 43, 15, 0.05);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease,
    border-color 0.3s ease,
    border-bottom-color 0.4s ease;
  overflow: visible;
  margin-top: 8px;
}
.staff-card:hover {
  box-shadow: 0 8px 32px rgba(13, 43, 15, 0.12);
  transform: translateY(-3px);
  border-color: rgba(249, 168, 37, 0.35);
=======
  position: relative; display: flex; flex-direction: row; align-items: flex-start;
  gap: 24px; background: #ffffff; border: 1px solid rgba(13,43,15,0.07);
  border-radius: 4px; padding: 24px 28px; box-shadow: 0 2px 16px rgba(13,43,15,0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  overflow: visible; margin-top: 8px; border-bottom: 2px solid transparent;
}
.staff-card:hover {
  box-shadow: 0 8px 32px rgba(13,43,15,0.12); transform: translateY(-3px);
  border-color: rgba(249,168,37,0.35); border-bottom-color: #f9a825;
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}
.staff-photo-wrap {
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: visible;
  margin-top: 4px;
}
.staff-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  height: 106px;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s ease;
}
.staff-card:hover .staff-photo {
  transform: translateX(-50%) scale(1.05);
}
.staff-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.staff-name {
  font-family: 'Poppins', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #0d2b0f;
  line-height: 1.3;
  letter-spacing: 0.01em;
}
.staff-rule {
  width: 28px;
  height: 1.5px;
  background: linear-gradient(to right, #f9a825, rgba(249, 168, 37, 0.2));
  border-radius: 2px;
  transition: width 0.3s ease;
}
.staff-card:hover .staff-rule {
  width: 48px;
}
.staff-subtitle {
  font-size: 0.75rem;
  color: #1b5e20;
  font-style: italic;
  line-height: 1.5;
}
.staff-position {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.45);
}
.staff-card {
  border-bottom: 2px solid transparent;
}
.staff-card:hover {
  border-bottom-color: #f9a825;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  z-index: 2;
  background: rgba(13, 43, 15, 0.58);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.22s ease;
  color: white;
}
.photo-overlay-label {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.featured-photo-wrap:hover .photo-overlay,
.staff-photo-wrap:hover .photo-overlay {
  opacity: 1;
}

.btn-add {
<<<<<<< HEAD
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  background: #0d2b0f;
  padding: 7px 14px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    transform 0.15s;
}
.btn-add:hover {
  background: #1b5e20;
  transform: translateY(-1px);
}

=======
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
  color: #fff; background: #0d2b0f; padding: 7px 14px; border-radius: 3px;
  border: none; cursor: pointer; white-space: nowrap; transition: background 0.2s, transform 0.15s;
}
.btn-add:hover { background: #1b5e20; transform: translateY(-1px); }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
.btn-edit-inline {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0d2b0f;
  background: transparent;
  border: 1px solid rgba(13, 43, 15, 0.25);
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  width: fit-content;
  transition: all 0.2s;
}
.btn-edit-inline:hover {
  background: #0d2b0f;
  color: #fff;
  border-color: #0d2b0f;
}
<<<<<<< HEAD

.card-actions {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}
=======
.btn-edit-inline:hover { background: #0d2b0f; color: #fff; border-color: #0d2b0f; }
.card-actions { display: flex; gap: 6px; margin-top: 6px; }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
.btn-icon {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0d2b0f;
  background: transparent;
  border: 1px solid rgba(13, 43, 15, 0.2);
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-icon:hover {
  background: #0d2b0f;
  color: #fff;
  border-color: #0d2b0f;
}
.btn-icon-danger {
  color: #b71c1c;
  border-color: rgba(183, 28, 28, 0.2);
}
.btn-icon-danger:hover {
  background: #b71c1c;
  color: #fff;
  border-color: #b71c1c;
}

.edit-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.edit-input {
  font-size: 0.82rem;
  color: #0d2b0f;
  border: 1px solid rgba(13, 43, 15, 0.25);
  border-radius: 3px;
  padding: 7px 10px;
  outline: none;
  background: #f7f5f0;
  transition: border-color 0.2s;
  font-family: 'Poppins', sans-serif;
}
.edit-input:focus {
  border-color: #1b5e20;
  background: #fff;
}
.edit-input-lg {
  font-size: 0.9rem;
  font-weight: 600;
}
.edit-input-sm {
  font-size: 0.75rem;
  padding: 5px 8px;
}
.edit-actions {
  display: flex;
  gap: 8px;
}
<<<<<<< HEAD

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  background: #0d2b0f;
  border: none;
  padding: 6px 14px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-save:hover:not(:disabled) {
  background: #1b5e20;
}
.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-save-sm {
  padding: 4px 10px;
  font-size: 0.6rem;
}

=======
.edit-input:focus { border-color: #1b5e20; background: #fff; }
.edit-input-lg { font-size: 0.9rem; font-weight: 600; }
.edit-input-sm { font-size: 0.75rem; padding: 5px 8px; }
.edit-actions  { display: flex; gap: 8px; }

.btn-save {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
  color: #fff; background: #0d2b0f; border: none; padding: 6px 14px;
  border-radius: 3px; cursor: pointer; transition: background 0.2s;
}
.btn-save:hover:not(:disabled) { background: #1b5e20; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-save-sm { padding: 4px 10px; font-size: 0.6rem; }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
.btn-cancel {
  display: inline-flex;
  align-items: center;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.55);
  background: transparent;
  border: 1px solid rgba(13, 43, 15, 0.18);
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover {
  border-color: rgba(13, 43, 15, 0.4);
  color: #0d2b0f;
}
.btn-cancel-sm {
  padding: 4px 10px;
  font-size: 0.6rem;
}
<<<<<<< HEAD

.btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  background: #b71c1c;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-delete:hover:not(:disabled) {
  background: #c62828;
}
.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
=======
.btn-cancel:hover { border-color: rgba(13,43,15,0.4); color: #0d2b0f; }
.btn-cancel-sm { padding: 4px 10px; font-size: 0.6rem; }
.btn-delete {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
  color: #fff; background: #b71c1c; border: none; padding: 8px 16px;
  border-radius: 3px; cursor: pointer; transition: background 0.2s;
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(4, 16, 5, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal-box {
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(4, 16, 5, 0.3);
  overflow: hidden;
  position: relative;
}
.modal-box-sm {
  max-width: 380px;
}
.modal-header {
  display: flex;
  align-items: center;
  padding: 18px 20px 18px 24px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.08);
  position: relative;
}
.modal-header-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #f9a825, #1b5e20);
}
.modal-header-accent-danger {
  background: linear-gradient(to bottom, #c62828, #b71c1c);
}
.modal-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0d2b0f;
  letter-spacing: 0.04em;
  flex: 1;
}
.modal-close {
  color: rgba(13, 43, 15, 0.4);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  transition:
    color 0.2s,
    background 0.2s;
}
.modal-close:hover {
  color: #0d2b0f;
  background: rgba(13, 43, 15, 0.07);
}
.modal-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 24px 8px;
}
.modal-photo-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: visible;
}
.modal-photo {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 134px;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
}
.modal-photo-wrap:hover .photo-overlay {
  opacity: 1;
}
.modal-photo-hint {
  font-size: 0.65rem;
  color: rgba(13, 43, 15, 0.45);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}
<<<<<<< HEAD
.modal-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 24px;
}
.field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.55);
}
.required {
  color: #b71c1c;
}
.field-optional {
  color: rgba(13, 43, 15, 0.35);
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
}
=======
.modal-fields { display: flex; flex-direction: column; gap: 14px; padding: 16px 24px; }
.field-group  { display: flex; flex-direction: column; gap: 5px; }
.field-label  {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(13,43,15,0.55);
}
.required       { color: #b71c1c; }
.field-optional { color: rgba(13,43,15,0.35); font-weight: 500; text-transform: none; letter-spacing: 0; }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
.modal-input {
  font-size: 0.83rem;
  color: #0d2b0f;
  border: 1px solid rgba(13, 43, 15, 0.2);
  border-radius: 3px;
  padding: 8px 12px;
  outline: none;
  background: #f7f5f0;
  transition:
    border-color 0.2s,
    background 0.2s;
  font-family: 'Poppins', sans-serif;
  width: 100%;
}
<<<<<<< HEAD
.modal-input:focus {
  border-color: #1b5e20;
  background: #fff;
}
.modal-error {
  font-size: 0.72rem;
  color: #b71c1c;
  font-weight: 600;
  padding: 0 24px 4px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid rgba(13, 43, 15, 0.08);
  background: rgba(247, 245, 240, 0.6);
}
.delete-confirm-text {
  font-size: 0.84rem;
  color: #4a5568;
  line-height: 1.6;
}
.delete-confirm-text strong {
  color: #0d2b0f;
=======
.modal-input:focus { border-color: #1b5e20; background: #fff; }
.modal-error  { font-size: 0.72rem; color: #b71c1c; font-weight: 600; padding: 0 24px 4px; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 10px; padding: 16px 24px;
  border-top: 1px solid rgba(13,43,15,0.08); background: rgba(247,245,240,0.6);
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}

.toast {
<<<<<<< HEAD
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  white-space: nowrap;
}
.toast-success {
  background: #0d2b0f;
  color: #fff;
}
.toast-error {
  background: #b71c1c;
  color: #fff;
}

=======
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  z-index: 200; display: flex; align-items: center; gap: 8px;
  font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em;
  padding: 10px 20px; border-radius: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); white-space: nowrap;
}
.toast-success { background: #0d2b0f; color: #fff; }
.toast-error   { background: #b71c1c; color: #fff; }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
.loader-sm {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.sr-item,
.sr-card {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
<<<<<<< HEAD
.sr-item.in-view,
.sr-card.in-view {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .personnel-hero {
    height: 280px;
  }
  .hero-title {
    font-size: 1.8rem;
  }
  .featured-card {
    flex-direction: column;
    text-align: center;
    padding: 36px 28px;
    gap: 28px;
  }
  .featured-info {
    align-items: center;
  }
  .featured-badge {
    align-self: center;
  }
  .staff-grid {
    grid-template-columns: 1fr;
  }
=======
.sr-item.in-view, .sr-card.in-view { opacity: 1; transform: translateY(0); }

.fade-enter-active,  .fade-leave-active  { transition: opacity 0.3s ease; }
.fade-enter-from,    .fade-leave-to      { opacity: 0; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s ease; }
.modal-enter-active .modal-box, .modal-leave-active .modal-box {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box, .modal-leave-to .modal-box { transform: scale(0.96) translateY(8px); opacity: 0; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.toast-enter-from,   .toast-leave-to     { opacity: 0; transform: translateX(-50%) translateY(10px); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .featured-card  { flex-direction: column; text-align: center; padding: 36px 28px; gap: 28px; }
  .featured-info  { align-items: center; }
  .featured-badge { align-self: center; }
  .staff-grid     { grid-template-columns: 1fr; }
>>>>>>> ff427e644e27e00b048de251ce74b62c51bb49dd
}
</style>
