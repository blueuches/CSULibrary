<template>
  <div class="page-layout">
    <Sidebar :activeTab="'GALLERY'" />
    <div class="w-full relative overflow-y-auto flex flex-col items-center bg-white">
      <!-- ══ HERO — Report Display style ══ -->
      <div class="gallery-hero">
        <p class="hero-breadcrumb">
          Admin <span class="hero-breadcrumb-sep">›</span> Library Gallery
        </p>
        <h1 class="hero-title">
          <span class="hero-title--underlined">Library</span>
          <span class="hero-title--gold"> Sections</span>
        </h1>
        <p class="hero-subtitle">
          <span class="hero-dot-green"></span>
          Manage the CSU Library Gallery —
          <strong
            >{{ totalSections }} sections · {{ totalPhotos }} photos ·
            {{ floors.length }} floors</strong
          >
        </p>
      </div>

      <!-- ══ STICKY NAV ══ -->
      <div class="w-full sticky top-0 z-30 px-8 mt-3">
        <div
          class="w-full backdrop-blur-md bg-white/80 py-2 px-8 flex items-center justify-between border border-gray-200 rounded-2xl shadow-lg"
        >
          <div class="flex gap-4">
            <button
              v-for="(floor, i) in floors"
              :key="floor.id"
              @click="activeFloor = floor.id"
              :class="[
                'px-8 py-2.5 rounded-2xl font-black transition-all duration-300 text-xs uppercase tracking-widest border-2 nav-btn',
                activeFloor === floor.id && !searchQuery
                  ? 'bg-[#0d2b0f] border-[#0d2b0f] text-white shadow-md'
                  : 'bg-transparent border-[#0d2b0f] text-[#0d2b0f] hover:bg-[#1b5e20] hover:border-[#1b5e20] hover:text-white',
              ]"
              :style="{ animationDelay: `${i * 0.12}s` }"
            >
              {{ floor.name }}
            </button>
          </div>

          <!-- Search + New Section button -->
          <div class="nav-right">
            <div class="relative nav-search">
              <svg
                class="nav-search__icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Section..."
                class="w-full pl-9 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-[#0d2b0f] text-[#0d2b0f] font-bold text-sm focus:outline-none focus:ring-4 focus:ring-[#1b5e20]/10 transition-all shadow-inner"
              />
            </div>
            <button class="btn-new-nav" @click="openAdd()">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Section
            </button>
          </div>
        </div>
      </div>

      <!-- ══ CARDS SECTION ══ -->
      <div class="w-full px-8 flex flex-col items-center mt-12 relative z-10 pb-20">
        <transition-group name="fade" tag="div" class="w-full">
          <div
            v-for="floor in searchQuery ? filteredFloors : activeFloorData"
            :key="floor.id"
            class="w-full mb-12"
          >
            <div v-for="wing in floor.wings" :key="wing.name" class="mb-20">
              <!-- Wing header -->
              <div class="wing-header mb-10">
                <div class="flex items-center gap-6 flex-1">
                  <span class="text-yellow-600 font-bold tracking-tighter text-sm">{{
                    floor.name
                  }}</span>
                  <h3 class="text-4xl font-black text-[#0d2b0f] uppercase tracking-tighter">
                    {{ wing.name }}
                  </h3>
                  <div
                    class="h-[2px] flex-grow max-w-[150px] bg-gradient-to-r from-[#0d2b0f] to-yellow-500"
                  ></div>
                </div>
                <button class="btn-wing-add" @click="openAdd(floor.id, wing.name)">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  Add to {{ wing.name }}
                </button>
              </div>

              <!-- Cards grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <div
                  v-for="(section, idx) in wing.sections"
                  :key="section.title + idx"
                  class="group relative h-96 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 bg-gray-100 border-2 cursor-pointer"
                  :class="[
                    editTarget?.title === section.title &&
                    editTarget?.floorId === floor.id &&
                    editTarget?.wingName === wing.name
                      ? 'border-[#f9a825] shadow-[0_0_0_4px_rgba(249,168,37,0.18)]'
                      : 'border-transparent hover:-translate-y-3',
                  ]"
                  :style="
                    section.images.length > 0
                      ? {
                          backgroundImage: `url(${section.images[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transitionDelay: `${(idx % 4) * 0.08}s`,
                        }
                      : { transitionDelay: `${(idx % 4) * 0.08}s` }
                  "
                  @click="openViewer(section, floor.id, wing.name)"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-[#1b5e20]/95 transition-all duration-500"
                  ></div>

                  <!-- Admin controls -->
                  <div class="admin-ctrl" @click.stop>
                    <button
                      class="ac-btn ac-btn--edit"
                      @click="openEdit(section, floor.id, wing.name)"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      class="ac-btn ac-btn--del"
                      @click="askDelete(section, floor.id, wing.name)"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>

                  <!-- Floor badge -->
                  <div class="absolute top-3 left-3 z-10">
                    <div
                      class="px-3 py-1 rounded-2xl text-[10px] font-bold tracking-widest uppercase shadow-sm bg-[#0d2b0f] text-white"
                    >
                      {{ floor.name }}
                    </div>
                  </div>

                  <!-- Card body -->
                  <div class="absolute inset-0 p-8 flex flex-col justify-end">
                    <div
                      class="w-10 h-1 bg-[#1b5e20] mb-4 rounded-full transition-all group-hover:w-20"
                    ></div>
                    <h4
                      class="text-white font-black text-2xl leading-tight uppercase group-hover:text-yellow-500 transition-colors duration-300"
                    >
                      {{ section.title }}
                    </h4>
                    <p
                      v-if="section.note"
                      class="text-[#66bb6a] text-[10px] font-bold uppercase mt-1 tracking-widest"
                    >
                      {{ section.note }}
                    </p>
                    <p
                      class="text-white/80 text-sm mt-4 leading-relaxed"
                      style="
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                      "
                    >
                      {{ section.description }}
                    </p>
                    <div class="flex items-center gap-1.5 mt-3">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                      <span class="text-white/38 text-[10px] font-semibold"
                        >{{ section.images.length }} photo{{
                          section.images.length !== 1 ? 's' : ''
                        }}</span
                      >
                      <span
                        v-if="!section.images.length"
                        class="text-yellow-400/60 text-[10px] font-bold"
                        >· No cover yet</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Add section slot -->
                <button
                  class="relative h-96 rounded-2xl border-2 border-dashed border-[#0d2b0f]/20 bg-transparent flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:border-[#1b5e20] hover:bg-[#f4f9f4] group/add"
                  @click="openAdd(floor.id, wing.name)"
                >
                  <div
                    class="w-14 h-14 rounded-2xl bg-[#0d2b0f]/05 flex items-center justify-center group-hover/add:bg-[#1b5e20]/10 transition-all"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      class="text-[#0d2b0f]/25 group-hover/add:text-[#1b5e20] transition-colors"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div class="text-center px-4">
                    <p
                      class="text-[#0d2b0f]/30 group-hover/add:text-[#1b5e20] text-[11px] font-black uppercase tracking-widest transition-colors"
                    >
                      Add Section
                    </p>
                    <p class="text-[#0d2b0f]/20 text-[10px] mt-1 font-medium">to {{ wing.name }}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- ══ PHOTO VIEWER MODAL ══ -->
      <Transition name="modal">
        <div
          v-if="viewerOpen"
          class="fixed inset-0 z-50 bg-[#0d2b0f]/90 flex items-center justify-center p-4 backdrop-blur-sm"
          @click.self="closeViewer"
        >
          <div class="absolute top-6 right-6 z-[60] flex items-center gap-3">
            <button class="ac-btn ac-btn--edit viewer-action-btn" @click="openEditFromViewer">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Section
            </button>
            <button class="ac-btn ac-btn--del viewer-action-btn" @click="askDeleteFromViewer">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
            <button @click="closeViewer" class="viewer-close">&times;</button>
          </div>

          <div class="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl relative">
            <div v-if="viewerSection" class="flex flex-col">
              <div class="relative min-h-[400px] flex items-center justify-center bg-gray-200">
                <button
                  v-if="viewerSection.images.length > 1"
                  @click="prevImg"
                  class="absolute left-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#f9a825] hover:text-[#0d2b0f] transition-all"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div
                  v-if="!viewerSection.images.length"
                  class="flex flex-col items-center justify-center gap-4 p-16 text-gray-400"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p class="font-bold text-sm">No photos yet — click Edit Section to add some</p>
                </div>
                <img
                  v-else
                  :src="viewerSection.images[viewerImgIndex]"
                  class="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />
                <button
                  v-if="viewerSection.images.length > 1"
                  @click="nextImg"
                  class="absolute right-4 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-[#f9a825] hover:text-[#0d2b0f] transition-all"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-if="viewerSection.images.length > 1"
                class="flex justify-center gap-3 p-4 bg-gray-50 overflow-x-auto"
              >
                <div
                  v-for="(img, idx) in viewerSection.images"
                  :key="idx"
                  @click="viewerImgIndex = idx"
                  class="w-20 h-14 rounded-2xl cursor-pointer border-2 overflow-hidden flex-shrink-0 transition-all"
                  :class="
                    viewerImgIndex === idx
                      ? 'border-[#1b5e20] scale-105 shadow-md'
                      : 'border-transparent opacity-60'
                  "
                >
                  <img :src="img" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="p-8 text-center border-t border-gray-100">
                <h2 class="text-[#0d2b0f] text-3xl font-black uppercase mb-2">
                  {{ viewerSection.title }}
                </h2>
                <p
                  v-if="viewerSection.note"
                  class="text-[#66bb6a] text-xs font-bold uppercase tracking-widest mb-2"
                >
                  {{ viewerSection.note }}
                </p>
                <p class="text-yellow-600 max-w-2xl mx-auto">{{ viewerSection.description }}</p>
                <p class="text-gray-400 text-xs mt-3 font-semibold">
                  {{ viewerSection.images.length }} photo{{
                    viewerSection.images.length !== 1 ? 's' : ''
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ══ EDIT / ADD MODAL ══ -->
      <Transition name="modal">
        <div v-if="formOpen" class="modal-bg" @click.self="closeForm">
          <div class="modal-sheet">
            <div class="modal-head">
              <div>
                <p class="modal-mode">{{ isAdding ? '✦ New Section' : '✦ Edit Section' }}</p>
                <h3 class="modal-title">
                  {{ isAdding ? 'Add to Gallery' : form.title || 'Edit Section' }}
                </h3>
              </div>
              <button class="icon-btn" @click="closeForm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="modal-body">
              <div class="fg-section">Location</div>
              <div class="fg-row-2">
                <div class="fg">
                  <label>Floor</label>
                  <select v-model="form.floorId" @change="onFloorChange">
                    <option v-for="f in floors" :key="f.id" :value="f.id">{{ f.name }}</option>
                  </select>
                </div>
                <div class="fg">
                  <label>Wing</label>
                  <select v-model="form.wingName">
                    <option v-for="w in formWings" :key="w.name" :value="w.name">
                      {{ w.name }}
                    </option>
                    <option value="__new__">+ New Wing…</option>
                  </select>
                </div>
              </div>
              <div v-if="form.wingName === '__new__'" class="fg">
                <label>New Wing Name</label>
                <input v-model="form.newWingName" placeholder="e.g. South Wing" />
              </div>

              <div class="fg-section">Section Info</div>
              <div class="fg">
                <label>Title <span class="req">*</span></label>
                <input v-model="form.title" placeholder="e.g. Quiet Room for PWD" />
              </div>
              <div class="fg">
                <label>Description <span class="req">*</span></label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  placeholder="Brief description shown on the gallery card…"
                ></textarea>
              </div>
              <div class="fg">
                <label
                  >Note
                  <span class="opt"
                    >· optional · shows as green label e.g. "Female", "1, 2, 3"</span
                  ></label
                >
                <input v-model="form.note" placeholder="e.g. Female Only" />
              </div>

              <div class="fg-section">
                Photos
                <span class="photo-pill">{{ form.images.length }} / 10</span>
              </div>
              <div class="photo-grid">
                <div
                  v-for="(img, i) in form.images"
                  :key="i"
                  class="ptile"
                  :class="{ 'ptile--cover': i === 0 }"
                >
                  <img :src="img" :alt="`Photo ${i + 1}`" />
                  <div class="ptile-over">
                    <span v-if="i === 0" class="cover-badge">Cover</span>
                    <div class="ptile-btns">
                      <button
                        v-if="i > 0"
                        class="pb pb--star"
                        @click="setCover(i)"
                        title="Set as cover"
                      >
                        ★
                      </button>
                      <button class="pb pb--del" @click="removePhoto(i)" title="Remove">✕</button>
                    </div>
                  </div>
                </div>
                <label v-if="form.images.length < 10" class="photo-slot">
                  <input type="file" accept="image/*" multiple hidden @change="onPhotoUpload" />
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Upload</span>
                </label>
              </div>
              <p class="photo-hint">
                First photo = cover shown on gallery card. Click ★ to change cover.
              </p>

              <div class="fg-section">Preview · as shown on the public gallery</div>
              <div
                class="live-preview"
                :style="form.images[0] ? `background-image:url(${form.images[0]})` : ''"
              >
                <div class="lp-gradient"></div>
                <div class="absolute top-3 left-3">
                  <span
                    class="px-3 py-1 rounded-2xl text-[10px] font-bold tracking-widest uppercase bg-[#0d2b0f] text-white"
                  >
                    {{ floors.find((f) => f.id === form.floorId)?.name ?? '1st Floor' }}
                  </span>
                </div>
                <div class="lp-body">
                  <div class="lp-bar"></div>
                  <p class="lp-title">{{ form.title || 'Section Title' }}</p>
                  <p v-if="form.note" class="lp-note">{{ form.note }}</p>
                  <p class="lp-desc">{{ form.description || 'Description will appear here.' }}</p>
                </div>
              </div>
            </div>

            <div class="modal-foot">
              <button class="btn-ghost" @click="closeForm">Cancel</button>
              <button
                class="btn-save"
                :disabled="!form.title.trim() || !form.description.trim()"
                @click="save"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {{ isAdding ? 'Add to Gallery' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ══ DELETE CONFIRM ══ -->
      <Transition name="modal">
        <div v-if="delTarget" class="modal-bg" @click.self="delTarget = null">
          <div class="del-modal">
            <div class="del-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <h3>Delete "{{ delTarget.sec.title }}"?</h3>
            <p>
              This section and all its photos will be permanently removed from the public gallery.
            </p>
            <div class="del-actions">
              <button class="btn-ghost" @click="delTarget = null">Cancel</button>
              <button class="btn-danger" @click="doDelete">Yes, Delete</button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ══ SCROLL TO TOP ══ -->
      <Transition name="fade-btn">
        <button
          v-if="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-6 right-6 z-50 rounded-lg p-3 hover:scale-110 transition-all"
          style="background: #0d2b0f"
        >
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 11l7-7 7 7"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 17l7-7 7 7"
            />
          </svg>
        </button>
      </Transition>

      <!-- ══ TOAST ══ -->
      <Transition name="toast">
        <div v-if="toast" class="toast" :class="`toast--${toast.type}`">
          <svg
            v-if="toast.type === 'success'"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ toast.msg }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

interface Section {
  title: string
  description: string
  note?: string
  images: string[]
}
interface Wing {
  name: string
  sections: Section[]
}
interface Floor {
  id: string
  name: string
  wings: Wing[]
}

const activeFloor = ref('floor1')
const searchQuery = ref('')
const formOpen = ref(false)
const isAdding = ref(false)
const showScrollTop = ref(false)
const editTarget = ref<(Section & { floorId: string; wingName: string }) | null>(null)
const delTarget = ref<{ sec: Section; floorId: string; wingName: string } | null>(null)
const toast = ref<{ msg: string; type: 'success' | 'error' } | null>(null)

const viewerOpen = ref(false)
const viewerSection = ref<Section | null>(null)
const viewerImgIndex = ref(0)
const viewerFloorId = ref('')
const viewerWingName = ref('')

const form = reactive({
  floorId: 'floor1',
  wingName: '',
  newWingName: '',
  title: '',
  description: '',
  note: '',
  images: [] as string[],
  _origTitle: '',
  _origFloor: '',
  _origWing: '',
})

const floors = ref<Floor[]>([
  {
    id: 'floor1',
    name: '1st Floor',
    wings: [
      {
        name: 'Main Wing',
        sections: [
          {
            title: 'Computer Lab',
            description: 'High-speed internet and modern workstations for digital research.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Auditorium',
            description: 'A spacious venue equipped for seminars and large lectures.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'PWD Section',
            description:
              'Inclusive learning area specifically designed for persons with disabilities.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Wall of Merit',
            description:
              'Honoring the notable contributors and distinguished alumni of the institution.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Award and Recognition Area',
            description: 'Showcasing the excellence and achievements of the university community.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Natural Science Museum',
            description:
              'A collection of biological and physical science specimens for educational display.',
            images: ['/imgs/Gallery/comlab1.JPG', '/imgs/Gallery/comlab1.JPG'],
          },
        ],
      },
      {
        name: 'Administrative Wing',
        sections: [
          {
            title: 'Technical Room',
            description: 'IT infrastructure and server management area.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Board Room',
            description: 'Executive meeting space for library board and faculty.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Office of the University Librarian',
            description: 'The administrative heart of the library system.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
        ],
      },
    ],
  },
  {
    id: 'floor2',
    name: '2nd Floor',
    wings: [
      {
        name: 'Right Wing',
        sections: [
          {
            title: 'Circulation',
            description: 'The hub for borrowing and returning books.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'General Reference',
            description: 'Global reference materials.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Reserve',
            description: 'High-demand course materials.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Discussion Room',
            note: '1, 2, 3',
            description: 'Group brainstorming spaces.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Huddle Area',
            description: 'Casual group discussions.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Phone Booth',
            description: 'Quiet pod for personal calls.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
        ],
      },
      {
        name: 'Left Wing',
        sections: [
          {
            title: 'Filipiniana',
            description: 'Books about the Philippines.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Periodicals',
            description: 'Newspapers and journals.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Shelving Area',
            description: 'Stacks housing physical books.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Reading Hub',
            description: 'Silent zone for deep focus.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Phone Booth',
            description: 'Isolated sound-insulated unit.',
            images: ['/imgs/Gallery/Pb1.jpg', '/imgs/Gallery/Pb2.jpg', '/imgs/Gallery/Pb3.jpg'],
          },
        ],
      },
    ],
  },
  {
    id: 'floor3',
    name: '3rd Floor',
    wings: [
      {
        name: 'Right Wing',
        sections: [
          {
            title: 'Nap Pad',
            note: 'Female',
            description: 'Serene resting area for female students.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Activity Loft',
            description: 'Creative space for workshops.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Quiet Room',
            description: 'Strictly silent atmosphere.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Multimedia Room',
            description: 'Digital media center.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
        ],
      },
      {
        name: 'Left Wing',
        sections: [
          {
            title: 'Nap Pad',
            note: 'Male',
            description: 'Sleeping pods for male students.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Library Cafe',
            description: 'Snacks and coffee browsing area.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Activity Center',
            description: 'Flexible event space.',
            images: ['/imgs/Gallery/comlab1.JPG'],
          },
          {
            title: 'Phone Booth',
            description: 'Focused private conversations.',
            images: ['/imgs/Gallery/Pb1.jpg', '/imgs/Gallery/Pb2.jpg', '/imgs/Gallery/Pb3.jpg'],
          },
        ],
      },
    ],
  },
])

const activeFloorData = computed(() => floors.value.filter((f) => f.id === activeFloor.value))
const filteredFloors = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return floors.value
    .map((f) => ({
      ...f,
      wings: f.wings
        .map((w) => ({
          ...w,
          sections: w.sections.filter(
            (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q),
          ),
        }))
        .filter((w) => w.sections.length > 0),
    }))
    .filter((f) => f.wings.length > 0)
})
const formWings = computed(() => floors.value.find((f) => f.id === form.floorId)?.wings ?? [])
const totalSections = computed(() =>
  floors.value.reduce((a, f) => a + f.wings.reduce((b, w) => b + w.sections.length, 0), 0),
)
const totalPhotos = computed(() =>
  floors.value.reduce(
    (a, f) =>
      a + f.wings.reduce((b, w) => b + w.sections.reduce((c, s) => c + s.images.length, 0), 0),
    0,
  ),
)

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

function showToast(msg: string, type: 'success' | 'error' = 'success') {
  toast.value = { msg, type }
  setTimeout(() => {
    toast.value = null
  }, 3000)
}
function findWing(floorId: string, wingName: string) {
  return floors.value.find((f) => f.id === floorId)?.wings.find((w) => w.name === wingName)
}

function openViewer(sec: Section, floorId: string, wingName: string) {
  viewerSection.value = sec
  viewerImgIndex.value = 0
  viewerFloorId.value = floorId
  viewerWingName.value = wingName
  viewerOpen.value = true
}
function closeViewer() {
  viewerOpen.value = false
}
function nextImg() {
  if (viewerSection.value)
    viewerImgIndex.value = (viewerImgIndex.value + 1) % viewerSection.value.images.length
}
function prevImg() {
  if (viewerSection.value)
    viewerImgIndex.value =
      viewerImgIndex.value === 0 ? viewerSection.value.images.length - 1 : viewerImgIndex.value - 1
}
function openEditFromViewer() {
  if (viewerSection.value) {
    closeViewer()
    openEdit(viewerSection.value, viewerFloorId.value, viewerWingName.value)
  }
}
function askDeleteFromViewer() {
  if (viewerSection.value) {
    closeViewer()
    askDelete(viewerSection.value, viewerFloorId.value, viewerWingName.value)
  }
}

function openAdd(floorId?: string, wingName?: string) {
  editTarget.value = null
  isAdding.value = true
  formOpen.value = true
  const fid = floorId ?? activeFloor.value
  const wing = wingName ?? floors.value.find((f) => f.id === fid)?.wings[0]?.name ?? ''
  Object.assign(form, {
    floorId: fid,
    wingName: wing,
    newWingName: '',
    title: '',
    description: '',
    note: '',
    images: [],
    _origTitle: '',
    _origFloor: '',
    _origWing: '',
  })
}
function openEdit(sec: Section, floorId: string, wingName: string) {
  editTarget.value = { ...sec, floorId, wingName }
  isAdding.value = false
  formOpen.value = true
  Object.assign(form, {
    floorId,
    wingName,
    newWingName: '',
    title: sec.title,
    description: sec.description,
    note: sec.note ?? '',
    images: [...sec.images],
    _origTitle: sec.title,
    _origFloor: floorId,
    _origWing: wingName,
  })
}
function closeForm() {
  formOpen.value = false
  editTarget.value = null
}
function onFloorChange() {
  form.wingName = formWings.value[0]?.name ?? ''
}

function save() {
  if (!form.title.trim() || !form.description.trim()) return
  const resolvedWing = form.wingName === '__new__' ? form.newWingName.trim() : form.wingName
  if (!resolvedWing) return
  const targetFloor = floors.value.find((f) => f.id === form.floorId)
  if (!targetFloor) return
  if (!targetFloor.wings.find((w) => w.name === resolvedWing))
    targetFloor.wings.push({ name: resolvedWing, sections: [] })
  const targetWing = targetFloor.wings.find((w) => w.name === resolvedWing)!
  const newSec: Section = {
    title: form.title.trim(),
    description: form.description.trim(),
    note: form.note.trim() || undefined,
    images: [...form.images],
  }
  if (isAdding.value) {
    targetWing.sections.push(newSec)
    showToast(`"${newSec.title}" added to gallery!`)
  } else {
    const oldWing = findWing(form._origFloor, form._origWing)
    if (oldWing) {
      const i = oldWing.sections.findIndex((s) => s.title === form._origTitle)
      if (i !== -1) oldWing.sections.splice(i, 1)
    }
    targetWing.sections.push(newSec)
    showToast(`"${newSec.title}" updated!`)
  }
  closeForm()
}
function askDelete(sec: Section, floorId: string, wingName: string) {
  delTarget.value = { sec, floorId, wingName }
}
function doDelete() {
  if (!delTarget.value) return
  const { floorId, wingName, sec } = delTarget.value
  const wing = findWing(floorId, wingName)
  if (wing) {
    const i = wing.sections.findIndex((s) => s.title === sec.title)
    if (i !== -1) wing.sections.splice(i, 1)
  }
  if (editTarget.value?.title === sec.title) closeForm()
  showToast(`"${sec.title}" deleted.`, 'error')
  delTarget.value = null
}
function onPhotoUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  Array.from(input.files).forEach((file) => {
    if (form.images.length < 10) form.images.push(URL.createObjectURL(file))
  })
  input.value = ''
}
function removePhoto(i: number) {
  form.images.splice(i, 1)
}
function setCover(i: number) {
  const r = form.images.splice(i, 1)
  const img = r[0]
  if (img !== undefined) form.images.unshift(img)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
/* ── ADMIN BANNER ── */
.admin-banner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 32px;
  background: #0d2b0f;
  flex-wrap: wrap;
}
.admin-banner__left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
}
.admin-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #66bb6a;
  box-shadow: 0 0 6px #66bb6a;
  flex-shrink: 0;
}
.admin-sep {
  color: rgba(255, 255, 255, 0.28);
}
.admin-dim {
  color: rgba(255, 255, 255, 0.38);
  font-weight: 500;
}

/* ── HERO ── */
.gallery-hero {
  width: 100%;
  padding: 36px 40px 28px;
  text-align: left;
  font-family: 'Poppins', sans-serif;
}
.hero-breadcrumb {
  font-family: 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.45);
  margin: 0 0 8px;
}
.hero-breadcrumb-sep {
  margin: 0 4px;
  color: rgba(13, 43, 15, 0.35);
  font-size: 0.75rem;
}
.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0 0 8px;
  display: inline-block;
}
.hero-title--gold {
  color: #f9a825;
  margin-left: 5px;
}
.hero-title--underlined {
  position: relative;
  display: inline-block;
}
.hero-title--underlined::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #0d2b0f, #f9a825);
  border-radius: 3px;
}
.hero-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: rgba(13, 43, 15, 0.55);
  margin: 18px 0 0;
}
.hero-subtitle strong {
  color: #0d2b0f;
  font-weight: 700;
}
.hero-dot-green {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #66bb6a;
  box-shadow: 0 0 6px #66bb6a;
  flex-shrink: 0;
}

/* ── STICKY NAV ── */
.nav-btn {
  opacity: 0;
  animation: slideInLeft 0.5s ease forwards;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: slideInRight 0.5s ease 0.3s forwards;
}
.nav-search {
  position: relative;
  width: 240px;
}
.nav-search__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(13, 43, 15, 0.4);
  pointer-events: none;
  z-index: 1;
}

/* ── NEW SECTION BUTTON (nav) ── */
.btn-new-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 16px;
  border: 2px solid #0d2b0f;
  background: #0d2b0f;
  color: white;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  font-family: inherit;
}
.btn-new-nav:hover {
  background: #1b5e20;
  border-color: #1b5e20;
}

/* ── WING HEADER ── */
.wing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.btn-wing-add {
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1.5px solid rgba(13, 43, 15, 0.15);
  background: transparent;
  font-size: 0.62rem;
  font-weight: 800;
  color: rgba(13, 43, 15, 0.42);
  cursor: pointer;
  transition: all 0.16s;
}
.btn-wing-add:hover {
  background: #0d2b0f;
  color: white;
  border-color: #0d2b0f;
}

/* ── ADMIN CTRL on cards ── */
.admin-ctrl {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
  display: flex;
  gap: 5px;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.18s,
    transform 0.18s;
}
.group:hover .admin-ctrl {
  opacity: 1;
  transform: translateY(0);
}
.ac-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 8px;
  border: none;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.14s;
}
.ac-btn--edit {
  background: rgba(255, 255, 255, 0.18);
  color: white;
}
.ac-btn--edit:hover {
  background: #f9a825;
  color: #5a3400;
}
.ac-btn--del {
  background: rgba(255, 255, 255, 0.18);
  color: white;
}
.ac-btn--del:hover {
  background: #c62828;
  color: white;
}

/* ══ MODAL ══ */
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}
.modal-sheet {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 22px 16px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.08);
  flex-shrink: 0;
}
.modal-mode {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1b5e20;
  margin: 0 0 4px;
}
.modal-title {
  font-size: 1.05rem;
  font-weight: 900;
  color: #0d2b0f;
  margin: 0;
}
.modal-body {
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  flex: 1;
}
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 22px;
  border-top: 1px solid rgba(13, 43, 15, 0.08);
  flex-shrink: 0;
}

.fg-section {
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(13, 43, 15, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgba(13, 43, 15, 0.06);
}
.photo-pill {
  background: rgba(13, 43, 15, 0.07);
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 0.58rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.45);
  letter-spacing: 0;
  text-transform: none;
}
.fg-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.fg {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fg label {
  font-size: 0.64rem;
  font-weight: 700;
  color: rgba(13, 43, 15, 0.48);
}
.req {
  color: #c62828;
}
.opt {
  font-size: 0.58rem;
  font-weight: 500;
  color: rgba(13, 43, 15, 0.28);
}
.fg input,
.fg select,
.fg textarea {
  font-family: inherit;
  font-size: 0.78rem;
  color: #0d2b0f;
  background: #fdfcfa;
  border: 1.5px solid rgba(13, 43, 15, 0.12);
  border-radius: 9px;
  padding: 9px 12px;
  outline: none;
  width: 100%;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.fg input:focus,
.fg select:focus,
.fg textarea:focus {
  border-color: #1b5e20;
  box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.08);
}
.fg textarea {
  resize: vertical;
  min-height: 70px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
}
.ptile {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  background: #f0ede7;
  border: 2px solid transparent;
}
.ptile--cover {
  border-color: #f9a825;
}
.ptile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ptile-over {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  opacity: 0;
  transition: opacity 0.14s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.ptile:hover .ptile-over {
  opacity: 1;
}
.cover-badge {
  position: absolute;
  top: 3px;
  left: 3px;
  font-size: 0.42rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: #f9a825;
  color: #5a3400;
  padding: 1px 5px;
  border-radius: 3px;
}
.ptile-btns {
  display: flex;
  gap: 3px;
}
.pb {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.58rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.13s;
}
.pb:hover {
  background: rgba(255, 255, 255, 0.35);
}
.pb--del:hover {
  background: rgba(198, 40, 40, 0.75);
}
.photo-slot {
  aspect-ratio: 4/3;
  border-radius: 8px;
  border: 2px dashed rgba(13, 43, 15, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  color: rgba(13, 43, 15, 0.28);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.14s;
}
.photo-slot:hover {
  border-color: #1b5e20;
  color: #1b5e20;
  background: rgba(27, 94, 32, 0.03);
}
.photo-hint {
  font-size: 0.6rem;
  color: rgba(13, 43, 15, 0.3);
  margin-top: -4px;
}

.live-preview {
  position: relative;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  background: #1a2a1a;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(13, 43, 15, 0.1);
}
.lp-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.2) 55%,
    transparent 100%
  );
}
.lp-body {
  position: absolute;
  inset: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.lp-bar {
  width: 28px;
  height: 4px;
  background: #1b5e20;
  border-radius: 2px;
  margin-bottom: 8px;
}
.lp-title {
  font-size: 1rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  line-height: 1.2;
  margin: 0;
}
.lp-note {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #66bb6a;
  margin: 3px 0 0;
}
.lp-desc {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.72);
  margin: 6px 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  background: #0d2b0f;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(13, 43, 15, 0.2);
  transition:
    background 0.15s,
    transform 0.14s;
}
.btn-save:hover:not(:disabled) {
  background: #1b5e20;
  transform: translateY(-1px);
}
.btn-save:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.btn-ghost {
  padding: 10px 18px;
  background: transparent;
  color: rgba(13, 43, 15, 0.5);
  border: 1.5px solid rgba(13, 43, 15, 0.12);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.14s;
}
.btn-ghost:hover {
  background: #f5f2ec;
  color: #0d2b0f;
}
.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(13, 43, 15, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(13, 43, 15, 0.4);
  transition: all 0.14s;
  flex-shrink: 0;
}
.icon-btn:hover {
  background: #f5f2ec;
  color: #0d2b0f;
}

.del-modal {
  background: white;
  border-radius: 20px;
  padding: 36px;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
}
.del-icon {
  width: 56px;
  height: 56px;
  background: rgba(198, 40, 40, 0.08);
  color: #c62828;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.del-modal h3 {
  font-size: 1.05rem;
  font-weight: 900;
  color: #0d2b0f;
  margin: 0 0 8px;
}
.del-modal p {
  font-size: 0.74rem;
  color: rgba(13, 43, 15, 0.48);
  line-height: 1.6;
  margin: 0 0 24px;
}
.del-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.btn-danger {
  padding: 10px 20px;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.2);
  transition: background 0.14s;
}
.btn-danger:hover {
  background: #b71c1c;
}

.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
  font-size: 0.74rem;
  font-weight: 700;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
  white-space: nowrap;
}
.toast--success {
  background: #1b5e20;
}
.toast--error {
  background: #c62828;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.22s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.22s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
.fade-btn-enter-active,
.fade-btn-leave-active {
  transition: opacity 0.3s ease;
}
.fade-btn-enter-from,
.fade-btn-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #0d2b0f;
  border-radius: 4px;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 640px) {
  .photo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .fg-row-2 {
    grid-template-columns: 1fr;
  }
  .nav-right {
    flex-direction: column;
    gap: 6px;
  }
  .nav-search {
    width: 100%;
  }
}

/* ── VIEWER ── */
.viewer-close {
  color: white;
  font-size: 2.8rem;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
  padding: 0 4px;
}
.viewer-close:hover {
  color: #f9a825;
}
.viewer-action-btn {
  font-size: 0.68rem;
  padding: 8px 14px;
}

.page-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>
