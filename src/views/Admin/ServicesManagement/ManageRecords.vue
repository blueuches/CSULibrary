<template>
  <div class="w-full min-h-screen font-['Poppins'] bg-[#f7f5f0] pb-20 pt-[40px] relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1b5e20]/5 blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-[#2e7d32]/4 blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
      <svg class="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1b5e20" stroke-width="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="w-full px-4 sm:px-8 lg:px-12 relative z-10">
      <!-- Page Header -->
      <div class="page-header mb-10 text-center">
        <div class="flex mt-8 items-center justify-center gap-3">
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
          <span class="text-[10px] font-extrabold tracking-[0.32em] text-[#1a2e1a] uppercase">Library Services Management</span>
          <div class="w-10 h-[2px] bg-[#f9a825]"></div>
        </div>
        <h1 class="manage-heading text-[#1a2e1a] uppercase mb-2" style="font-family: 'Poppins', sans-serif; letter-spacing: -0.02em">
          Manage Records
        </h1>
        <p class="text-[13px] text-[#888] leading-relaxed max-w-xl mx-auto font-normal tracking-wide">
          Update links, descriptions, and visibility for each digital record card shown on the Records page.
        </p>
        <div class="mt-6">
          <button @click="openAddModal"
            class="add-card-btn inline-flex items-center gap-2 px-6 py-3 bg-[#1b5e20] text-white text-[12px] font-bold tracking-widest uppercase rounded-xl shadow-lg hover:bg-[#2e7d32] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 font-['Poppins']">
            <Plus class="w-4 h-4" />
            Add New Card
          </button>
        </div>
      </div>

      <!-- Toast -->
      <transition name="toast">
        <div v-if="toast.show"
          :class="['fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-[13px] font-semibold transition-all', toast.type === 'success' ? 'bg-[#1b5e20]' : 'bg-red-600']">
          <CheckCircle v-if="toast.type === 'success'" class="w-4 h-4" />
          <XCircle v-else class="w-4 h-4" />
          {{ toast.message }}
        </div>
      </transition>

      <!-- Records Cards -->
      <div class="grid grid-cols-1 gap-5">
        <transition-group name="card-list">
          <div v-for="(record, index) in records" :key="record.id"
            class="manage-card bg-white rounded-xl border border-[#1b5e20]/10 shadow-sm overflow-hidden"
            :style="`animation-delay: ${0.1 + index * 0.08}s`">

            <!-- Card Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
                  <component :is="record.icon" class="w-5 h-5 text-[#1b5e20]" />
                </div>
                <div>
                  <h3 class="text-[13px] font-extrabold tracking-widest uppercase text-[#1b5e20]">{{ record.title }}</h3>
                  <span class="text-[11px] text-[#aaa] font-normal">Card #{{ index + 1 }} · Records Page</span>
                </div>
              </div>
              <div class="flex items-center gap-2 flex-wrap justify-end">
                <button @click="toggleVisibility(record)"
                  :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 border', record.visible ? 'bg-[#e8f5e9] text-[#1b5e20] border-[#1b5e20]/20 hover:bg-[#c8e6c9]' : 'bg-[#fafafa] text-[#aaa] border-[#ddd] hover:bg-[#f0f0f0]']">
                  <Eye v-if="record.visible" class="w-3.5 h-3.5" /><EyeOff v-else class="w-3.5 h-3.5" />
                  {{ record.visible ? 'Visible' : 'Hidden' }}
                </button>
                <button @click="toggleEdit(record)"
                  :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 border', record.editing ? 'bg-[#fff3e0] text-[#e65100] border-[#f9a825]/40' : 'bg-white text-[#555] border-[#ddd] hover:border-[#1b5e20]/30 hover:text-[#1b5e20]']">
                  <Pencil class="w-3.5 h-3.5" />
                  {{ record.editing ? 'Editing...' : 'Edit' }}
                </button>
                <button @click="confirmDelete(record)"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 border bg-white text-[#c62828] border-[#ffcdd2] hover:bg-[#ffebee] hover:border-[#ef9a9a]">
                  <Trash2 class="w-3.5 h-3.5" />Delete
                </button>
              </div>
            </div>

            <!-- View Mode -->
            <div v-if="!record.editing" class="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">Button Label</p>
                <p class="text-[13px] text-[#333] font-medium">{{ record.btnLabel }}</p>
              </div>
              <div class="md:col-span-2">
                <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">{{ record.linkType === 'route' ? 'Router Route Name' : 'Link / URL' }}</p>
                <p class="text-[13px] text-[#333] font-medium break-all">
                  <span v-if="record.linkType === 'route'" class="text-[#1b5e20]">→ route: {{ record.link }}</span>
                  <a v-else :href="record.link" target="_blank" class="text-[#1b5e20] underline underline-offset-2 hover:text-[#2e7d32]">{{ record.link || '(no link set)' }}</a>
                </p>
              </div>
              <div class="md:col-span-3">
                <p class="text-[10px] font-bold tracking-widest text-[#1b5e20]/60 uppercase mb-1">Description</p>
                <p class="text-[13px] text-[#555] leading-relaxed font-light">{{ record.description }}</p>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Card Title</label>
                <input v-model="record.draft.title" type="text" class="field" placeholder="e.g. CD-ROM" />
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Button Label</label>
                <input v-model="record.draft.btnLabel" type="text" class="field" placeholder="e.g. Download CD-ROM" />
              </div>

              <!-- Icon Picker inline -->
              <div class="md:col-span-2">
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Icon</label>
                <div class="flex items-center gap-2 flex-wrap">
                  <button v-for="opt in quickIcons" :key="opt.key" @click="record.draft.iconKey = opt.key" :title="opt.label"
                    :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-150 text-[9px] font-bold tracking-wider uppercase', record.draft.iconKey === opt.key ? 'bg-[#1b5e20] border-[#1b5e20] text-white shadow scale-105' : 'bg-white border-[#ddd] text-[#666] hover:border-[#1b5e20]/40 hover:text-[#1b5e20]']">
                    <component :is="opt.component" class="w-4 h-4" />{{ opt.label }}
                  </button>
                  <!-- Browse more -->
                  <button @click="openIconBrowser(record.draft)"
                    :class="['flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-150 text-[9px] font-bold tracking-wider uppercase', !quickIcons.find(o => o.key === record.draft.iconKey) ? 'bg-[#1b5e20] border-[#1b5e20] text-white shadow' : 'bg-[#f0fdf4] border-[#1b5e20]/30 text-[#1b5e20] hover:bg-[#dcfce7]']">
                    <LayoutGrid class="w-4 h-4" />Browse
                  </button>
                  <!-- Selected custom icon preview -->
                  <div v-if="!quickIcons.find(o => o.key === record.draft.iconKey)" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#e8f5e9] border border-[#1b5e20]/20 text-[#1b5e20]">
                    <component :is="resolveIcon(record.draft.iconKey)" class="w-4 h-4" />
                    <span class="text-[10px] font-bold tracking-wide">{{ record.draft.iconKey }}</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Link Type</label>
                <div class="flex gap-2">
                  <button @click="record.draft.linkType = 'url'" :class="['flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all', record.draft.linkType === 'url' ? 'bg-[#1b5e20] text-white border-[#1b5e20]' : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30']">External URL</button>
                  <button @click="record.draft.linkType = 'route'" :class="['flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all', record.draft.linkType === 'route' ? 'bg-[#1b5e20] text-white border-[#1b5e20]' : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30']">Router Route</button>
                </div>
              </div>
              <div>
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">{{ record.draft.linkType === 'route' ? 'Route Name' : 'URL / Google Drive Link' }}</label>
                <input v-model="record.draft.link" type="text" class="field" :placeholder="record.draft.linkType === 'route' ? 'e.g. eresources' : 'https://drive.google.com/...'" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Description</label>
                <textarea v-model="record.draft.description" rows="3" class="field resize-none" placeholder="Short description shown on the card..."></textarea>
              </div>
              <div class="md:col-span-2 flex items-center justify-end gap-3 pt-1">
                <button @click="cancelEdit(record)" class="px-5 py-2 rounded-lg text-[12px] font-semibold text-[#888] border border-[#ddd] hover:border-[#bbb] transition-all">Cancel</button>
                <button @click="saveRecord(record)" class="save-btn flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-semibold text-white bg-[#1b5e20] hover:bg-[#2e7d32] transition-all shadow-sm">
                  <Save class="w-3.5 h-3.5" />Save Changes
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Empty State -->
      <div v-if="records.length === 0" class="text-center py-20">
        <div class="inline-flex p-5 rounded-2xl bg-[#e8f5e9] mb-4"><LayoutGrid class="w-8 h-8 text-[#1b5e20]/40" /></div>
        <p class="text-[14px] text-[#bbb] font-light">No record cards yet. Add one above!</p>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         ADD CARD MODAL
    ════════════════════════════════════════════════════════════════════════ -->
    <transition name="modal">
      <div v-if="addModal.open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="closeAddModal">
        <div class="modal-box relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="flex items-center justify-between px-6 py-5 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15"><Plus class="w-5 h-5 text-[#1b5e20]" /></div>
              <div>
                <h3 class="text-[14px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Add New Card</h3>
                <span class="text-[11px] text-[#aaa]">This card will appear on the Records page</span>
              </div>
            </div>
            <button @click="closeAddModal" class="w-8 h-8 flex items-center justify-center rounded-full text-[#aaa] hover:text-[#555] hover:bg-[#f0f0f0] transition-all"><X class="w-4 h-4" /></button>
          </div>

          <div class="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto">
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Card Title <span class="text-red-400">*</span></label>
              <input v-model="addModal.form.title" type="text" class="field" placeholder="e.g. Research Portal" />
            </div>
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Button Label <span class="text-red-400">*</span></label>
              <input v-model="addModal.form.btnLabel" type="text" class="field" placeholder="e.g. Go to Portal" />
            </div>

            <!-- Icon picker for add modal -->
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Icon <span class="text-red-400">*</span></label>
              <div class="flex items-center gap-2 flex-wrap">
                <button v-for="opt in quickIcons" :key="opt.key" @click="addModal.form.iconKey = opt.key" :title="opt.label"
                  :class="['flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all duration-150 text-[9px] font-bold tracking-wider uppercase', addModal.form.iconKey === opt.key ? 'bg-[#1b5e20] border-[#1b5e20] text-white shadow-md scale-105' : 'bg-white border-[#ddd] text-[#666] hover:border-[#1b5e20]/40 hover:text-[#1b5e20]']">
                  <component :is="opt.component" class="w-5 h-5" />{{ opt.label }}
                </button>
                <button @click="openIconBrowser(addModal.form)"
                  :class="['flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all duration-150 text-[9px] font-bold tracking-wider uppercase', !quickIcons.find(o => o.key === addModal.form.iconKey) ? 'bg-[#1b5e20] border-[#1b5e20] text-white shadow' : 'bg-[#f0fdf4] border-[#1b5e20]/30 text-[#1b5e20] hover:bg-[#dcfce7]']">
                  <LayoutGrid class="w-5 h-5" />Browse
                </button>
                <div v-if="!quickIcons.find(o => o.key === addModal.form.iconKey)" class="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#e8f5e9] border border-[#1b5e20]/20 text-[#1b5e20]">
                  <component :is="resolveIcon(addModal.form.iconKey)" class="w-5 h-5" />
                  <span class="text-[10px] font-bold tracking-wide">{{ addModal.form.iconKey }}</span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Link Type</label>
              <div class="flex gap-2">
                <button @click="addModal.form.linkType = 'url'" :class="['flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all', addModal.form.linkType === 'url' ? 'bg-[#1b5e20] text-white border-[#1b5e20]' : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30']">External URL</button>
                <button @click="addModal.form.linkType = 'route'" :class="['flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all', addModal.form.linkType === 'route' ? 'bg-[#1b5e20] text-white border-[#1b5e20]' : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30']">Router Route</button>
              </div>
            </div>
            <div>
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">{{ addModal.form.linkType === 'route' ? 'Route Name' : 'URL / Google Drive Link' }}</label>
              <input v-model="addModal.form.link" type="text" class="field" :placeholder="addModal.form.linkType === 'route' ? 'e.g. eresources' : 'https://drive.google.com/...'" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-bold tracking-widest text-[#1b5e20]/70 uppercase mb-1.5">Description</label>
              <textarea v-model="addModal.form.description" rows="3" class="field resize-none" placeholder="Short description shown on the card..."></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e8f5e9] bg-[#fafdf9]">
            <button @click="closeAddModal" class="px-5 py-2.5 rounded-lg text-[12px] font-semibold text-[#888] border border-[#ddd] hover:border-[#bbb] transition-all">Cancel</button>
            <button @click="addRecord" class="save-btn flex items-center gap-2 px-6 py-2.5 rounded-lg text-[12px] font-bold text-white bg-[#1b5e20] hover:bg-[#2e7d32] transition-all shadow-sm tracking-wide">
              <Plus class="w-3.5 h-3.5" />Add Card
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════════════════════════════════
         ICON BROWSER MODAL
    ════════════════════════════════════════════════════════════════════════ -->
    <transition name="modal">
      <div v-if="iconBrowser.open" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="closeIconBrowser">
        <div class="modal-box w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style="max-height: 85vh">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#e8f5e9] bg-gradient-to-r from-[#f1f8e9] to-white flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-[#1b5e20]/10 border border-[#1b5e20]/15">
                <LayoutGrid class="w-5 h-5 text-[#1b5e20]" />
              </div>
              <div>
                <h3 class="text-[14px] font-extrabold tracking-widest uppercase text-[#1b5e20]">Browse Icons</h3>
                <span class="text-[11px] text-[#aaa]">{{ filteredBrowseIcons.length }} icons available</span>
              </div>
            </div>
            <button @click="closeIconBrowser" class="w-8 h-8 flex items-center justify-center rounded-full text-[#aaa] hover:text-[#555] hover:bg-[#f0f0f0] transition-all"><X class="w-4 h-4" /></button>
          </div>

          <!-- Search + Category filter -->
          <div class="px-5 py-3 border-b border-[#e8f5e9] bg-[#fafdf9] flex-shrink-0 flex flex-col gap-3">
            <div class="relative">
              <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
              <input
                v-model="iconBrowser.search"
                type="text"
                placeholder="Search icons... (e.g. book, file, chart)"
                class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1b5e20]/20 bg-white text-[13px] text-[#333] font-['Poppins'] focus:outline-none focus:ring-2 focus:ring-[#1b5e20]/30 focus:border-[#1b5e20]/40 transition"
              />
            </div>
            <!-- Category tabs -->
            <div class="flex gap-1.5 flex-wrap">
              <button
                v-for="cat in iconCategories" :key="cat.key"
                @click="iconBrowser.category = cat.key"
                :class="['px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all border', iconBrowser.category === cat.key ? 'bg-[#1b5e20] text-white border-[#1b5e20]' : 'bg-white text-[#888] border-[#ddd] hover:border-[#1b5e20]/30 hover:text-[#1b5e20]']">
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Icon Grid -->
          <div class="overflow-y-auto flex-1 p-4">
            <div v-if="filteredBrowseIcons.length === 0" class="text-center py-12">
              <Search class="w-8 h-8 text-[#ccc] mx-auto mb-2" />
              <p class="text-[13px] text-[#bbb]">No icons found for "{{ iconBrowser.search }}"</p>
            </div>
            <div v-else class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
              <button
                v-for="opt in filteredBrowseIcons" :key="opt.key"
                @click="selectIconFromBrowser(opt.key)"
                :title="opt.label"
                :class="['flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-100 group', iconBrowser.selected === opt.key ? 'bg-[#1b5e20] border-[#1b5e20] text-white shadow-md scale-105' : 'bg-white border-transparent hover:border-[#1b5e20]/30 hover:bg-[#f0fdf4] text-[#555] hover:text-[#1b5e20]']">
                <component :is="opt.component" class="w-5 h-5 flex-shrink-0" />
                <span class="text-[8px] font-semibold tracking-wide text-center leading-tight w-full truncate">{{ opt.label }}</span>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-[#e8f5e9] bg-[#fafdf9] flex-shrink-0">
            <div class="flex items-center gap-2 text-[12px] text-[#888]">
              <span v-if="iconBrowser.selected">
                Selected: <span class="font-bold text-[#1b5e20]">{{ iconBrowser.selected }}</span>
              </span>
              <span v-else class="text-[#ccc]">No icon selected</span>
            </div>
            <div class="flex gap-2">
              <button @click="closeIconBrowser" class="px-4 py-2 rounded-lg text-[12px] font-semibold text-[#888] border border-[#ddd] hover:border-[#bbb] transition-all">Cancel</button>
              <button @click="confirmIconSelection" :disabled="!iconBrowser.selected"
                :class="['save-btn flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-bold transition-all shadow-sm', iconBrowser.selected ? 'bg-[#1b5e20] text-white hover:bg-[#2e7d32]' : 'bg-[#ccc] text-white cursor-not-allowed']">
                <Check class="w-3.5 h-3.5" />Use This Icon
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══════════════════════════════════════════════════════════════════════
         DELETE CONFIRM MODAL
    ════════════════════════════════════════════════════════════════════════ -->
    <transition name="modal">
      <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click.self="deleteTarget = null">
        <div class="modal-box w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="px-6 pt-6 pb-4 text-center">
            <div class="inline-flex p-4 rounded-full bg-red-50 mb-4"><Trash2 class="w-6 h-6 text-red-500" /></div>
            <h3 class="text-[15px] font-extrabold text-[#1a2e1a] mb-1">Delete this card?</h3>
            <p class="text-[13px] text-[#888] font-light leading-relaxed">
              <span class="font-semibold text-[#555]">"{{ deleteTarget?.title }}"</span> will be removed from the Records page. This cannot be undone.
            </p>
          </div>
          <div class="flex gap-3 px-6 pb-6">
            <button @click="deleteTarget = null" class="flex-1 py-2.5 rounded-lg text-[12px] font-semibold text-[#888] border border-[#ddd] hover:border-[#bbb] transition-all">Cancel</button>
            <button @click="deleteRecord" class="flex-1 py-2.5 rounded-lg text-[12px] font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm">Yes, Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  // Used in quick picker & records
  Upload, Disc3, BookOpen, Database, FileText, Globe, Link, Star,
  // Extra icons for browser
  Archive, Award, Bell, BarChart2, BookMarked, BookCopy,
  Briefcase, Building, Camera, CheckSquare, Clock, Cloud,
  Code, Coffee, Cpu, CreditCard, Download, File, FileArchive,
  FileBadge, FileImage, Film, Filter, Flag, Folder, FolderOpen, GraduationCap,
  Hash, Heart, HelpCircle, Home, ImageIcon, Info, Inbox, Layers, Layout,
  Library, LifeBuoy, List, Lock, LogIn, Mail, Map, MessageCircle,
  MessageSquare, Monitor, Moon, Music, Navigation, Package, Paperclip,
  PenTool, Phone, PieChart, Pin, Printer, Radio, RefreshCw, Save,
  Search, Send, Server, Settings, Share, Shield, ShoppingBag, Sidebar,
  Sliders, Smartphone, Speaker, Table, Tag, Terminal, ThumbsUp,
  Ticket, ToggleLeft, Wrench, TrendingUp, Tv, User, Users, Video,
  Wifi, Zap, BookOpenCheck, FlaskConical, Microscope, Atom, Dna,
  // UI icons used in component
  Pencil, Eye, EyeOff, CheckCircle, XCircle, Trash2, Plus, X,
  LayoutGrid, Check,
} from 'lucide-vue-next'

// ─── Types ────────────────────────────────────────────────────────────────────
interface IconOption { key: string; label: string; component: unknown; category: string }
interface DraftForm {
  title?: string; description?: string; btnLabel?: string
  link?: string; linkType?: 'url' | 'route'; iconKey: string
}
interface RecordItem {
  id: string; title: string; description: string; btnLabel: string
  link: string; linkType: 'url' | 'route'; iconKey: string; icon: unknown
  visible: boolean; editing: boolean
  draft: { title: string; description: string; btnLabel: string; link: string; linkType: 'url' | 'route'; iconKey: string }
}

// ─── All Icons Registry ───────────────────────────────────────────────────────
const ALL_ICONS: IconOption[] = [
  // Files & Documents
  { key: 'Upload',       label: 'Upload',      component: Upload,       category: 'files' },
  { key: 'Download',     label: 'Download',    component: Download,     category: 'files' },
  { key: 'File',         label: 'File',        component: File,         category: 'files' },
  { key: 'FileText',     label: 'File Text',   component: FileText,     category: 'files' },
  { key: 'FileImage',    label: 'File Image',  component: FileImage,    category: 'files' },
  { key: 'FileArchive',  label: 'Archive',     component: FileArchive,  category: 'files' },
  { key: 'FileBadge',    label: 'Badge',       component: FileBadge,    category: 'files' },
  { key: 'Folder',       label: 'Folder',      component: Folder,       category: 'files' },
  { key: 'FolderOpen',   label: 'Folder Open', component: FolderOpen,   category: 'files' },
  { key: 'Archive',      label: 'Archive',     component: Archive,      category: 'files' },
  { key: 'Paperclip',    label: 'Paperclip',   component: Paperclip,    category: 'files' },
  { key: 'Printer',      label: 'Printer',     component: Printer,      category: 'files' },

  // Education & Books
  { key: 'BookOpen',      label: 'Book Open',    component: BookOpen,      category: 'education' },
  { key: 'BookMarked',    label: 'Bookmarked',   component: BookMarked,    category: 'education' },
  { key: 'BookCopy',      label: 'Book Copy',    component: BookCopy,      category: 'education' },
  { key: 'BookOpenCheck', label: 'Book Check',   component: BookOpenCheck, category: 'education' },
  { key: 'Library',       label: 'Library',      component: Library,       category: 'education' },
  { key: 'GraduationCap', label: 'Graduation',   component: GraduationCap, category: 'education' },
  { key: 'Microscope',    label: 'Microscope',   component: Microscope,    category: 'education' },
  { key: 'FlaskConical',  label: 'Flask',        component: FlaskConical,  category: 'education' },
  { key: 'Atom',          label: 'Atom',         component: Atom,          category: 'education' },
  { key: 'Dna',           label: 'DNA',          component: Dna,           category: 'education' },
  { key: 'PenTool',       label: 'Pen Tool',     component: PenTool,       category: 'education' },

  // Data & Tech
  { key: 'Database',    label: 'Database',   component: Database,    category: 'tech' },
  { key: 'Server',      label: 'Server',     component: Server,      category: 'tech' },
  { key: 'Cloud',       label: 'Cloud',      component: Cloud,       category: 'tech' },
  { key: 'Cpu',         label: 'CPU',        component: Cpu,         category: 'tech' },
  { key: 'Code',        label: 'Code',       component: Code,        category: 'tech' },
  { key: 'Terminal',    label: 'Terminal',   component: Terminal,    category: 'tech' },
  { key: 'Monitor',     label: 'Monitor',    component: Monitor,     category: 'tech' },
  { key: 'Smartphone',  label: 'Phone',      component: Smartphone,  category: 'tech' },
  { key: 'Wifi',        label: 'Wifi',       component: Wifi,        category: 'tech' },
  { key: 'Layers',      label: 'Layers',     component: Layers,      category: 'tech' },
  { key: 'Disc3',       label: 'CD-ROM',     component: Disc3,       category: 'tech' },
  { key: 'Radio',       label: 'Radio',      component: Radio,       category: 'tech' },

  // Charts & Analytics
  { key: 'BarChart2',  label: 'Bar Chart',   component: BarChart2,  category: 'charts' },
  { key: 'PieChart',   label: 'Pie Chart',   component: PieChart,   category: 'charts' },
  { key: 'TrendingUp', label: 'Trending Up', component: TrendingUp, category: 'charts' },
  { key: 'Sliders',    label: 'Sliders',     component: Sliders,    category: 'charts' },
  { key: 'Filter',     label: 'Filter',      component: Filter,     category: 'charts' },
  { key: 'Table',      label: 'Table',       component: Table,      category: 'charts' },

  // Communication
  { key: 'Mail',           label: 'Mail',        component: Mail,           category: 'comm' },
  { key: 'MessageCircle',  label: 'Message',     component: MessageCircle,  category: 'comm' },
  { key: 'MessageSquare',  label: 'Msg Square',  component: MessageSquare,  category: 'comm' },
  { key: 'Bell',           label: 'Bell',        component: Bell,           category: 'comm' },
  { key: 'Send',           label: 'Send',        component: Send,           category: 'comm' },
  { key: 'Phone',          label: 'Phone',       component: Phone,          category: 'comm' },
  { key: 'Share',          label: 'Share',       component: Share,          category: 'comm' },
  { key: 'Inbox',          label: 'Inbox',       component: Inbox,          category: 'comm' },

  // People & Organizations
  { key: 'User',       label: 'User',       component: User,       category: 'people' },
  { key: 'Users',      label: 'Users',      component: Users,      category: 'people' },
  { key: 'Building',   label: 'Building',   component: Building,   category: 'people' },
  { key: 'Briefcase',  label: 'Briefcase',  component: Briefcase,  category: 'people' },
  { key: 'Award',      label: 'Award',      component: Award,      category: 'people' },
  { key: 'Heart',      label: 'Heart',      component: Heart,      category: 'people' },
  { key: 'ThumbsUp',   label: 'Thumbs Up',  component: ThumbsUp,   category: 'people' },

  // Navigation & UI
  { key: 'Globe',       label: 'Globe',       component: Globe,       category: 'ui' },
  { key: 'Link',        label: 'Link',        component: Link,        category: 'ui' },
  { key: 'Home',        label: 'Home',        component: Home,        category: 'ui' },
  { key: 'Map',         label: 'Map',         component: Map,         category: 'ui' },
  { key: 'Navigation',  label: 'Navigation',  component: Navigation,  category: 'ui' },
  { key: 'Pin',         label: 'Pin',         component: Pin,         category: 'ui' },
  { key: 'Layout',      label: 'Layout',      component: Layout,      category: 'ui' },
  { key: 'Sidebar',     label: 'Sidebar',     component: Sidebar,     category: 'ui' },
  { key: 'List',        label: 'List',        component: List,        category: 'ui' },
  { key: 'Settings',    label: 'Settings',    component: Settings,    category: 'ui' },
  { key: 'ToggleLeft',  label: 'Toggle',      component: ToggleLeft,  category: 'ui' },
  { key: 'RefreshCw',   label: 'Refresh',     component: RefreshCw,   category: 'ui' },
  { key: 'LogIn',       label: 'Log In',      component: LogIn,       category: 'ui' },
  { key: 'Lock',        label: 'Lock',        component: Lock,        category: 'ui' },
  { key: 'Shield',      label: 'Shield',      component: Shield,      category: 'ui' },

  // Media
  { key: 'ImageIcon',  label: 'Image',   component: ImageIcon,   category: 'media' },
  { key: 'Camera',  label: 'Camera',  component: Camera,  category: 'media' },
  { key: 'Film',    label: 'Film',    component: Film,    category: 'media' },
  { key: 'Video',   label: 'Video',   component: Video,   category: 'media' },
  { key: 'Music',   label: 'Music',   component: Music,   category: 'media' },
  { key: 'Speaker', label: 'Speaker', component: Speaker, category: 'media' },
  { key: 'Tv',      label: 'TV',      component: Tv,      category: 'media' },

  // Misc
  { key: 'Star',        label: 'Star',       component: Star,        category: 'misc' },
  { key: 'Zap',         label: 'Zap',        component: Zap,         category: 'misc' },
  { key: 'Flag',        label: 'Flag',       component: Flag,        category: 'misc' },
  { key: 'Tag',         label: 'Tag',        component: Tag,         category: 'misc' },
  { key: 'Hash',        label: 'Hash',       component: Hash,        category: 'misc' },
  { key: 'Package',     label: 'Package',    component: Package,     category: 'misc' },
  { key: 'ShoppingBag', label: 'Bag',        component: ShoppingBag, category: 'misc' },
  { key: 'CreditCard',  label: 'Card',       component: CreditCard,  category: 'misc' },
  { key: 'Coffee',      label: 'Coffee',     component: Coffee,      category: 'misc' },
  { key: 'Clock',       label: 'Clock',      component: Clock,       category: 'misc' },
  { key: 'Moon',        label: 'Moon',       component: Moon,        category: 'misc' },
  { key: 'Info',        label: 'Info',       component: Info,        category: 'misc' },
  { key: 'HelpCircle',  label: 'Help',       component: HelpCircle,  category: 'misc' },
  { key: 'LifeBuoy',    label: 'Life Buoy',  component: LifeBuoy,    category: 'misc' },
  { key: 'CheckSquare', label: 'Check',      component: CheckSquare, category: 'misc' },
  { key: 'Ticket',      label: 'Ticket',     component: Ticket,      category: 'misc' },
  { key: 'Wrench',      label: 'Wrench',     component: Wrench,      category: 'misc' },
  { key: 'FilePen',     label: 'Edit',       component: Pencil,      category: 'misc' },
]

// Quick picks shown inline (no modal needed)
const quickIcons = ALL_ICONS.filter(o =>
  ['Upload','Disc3','BookOpen','Database','FileText','Globe','Link','Star'].includes(o.key)
)

// Category filter tabs
const iconCategories = [
  { key: 'all',       label: 'All'        },
  { key: 'files',     label: 'Files'      },
  { key: 'education', label: 'Education'  },
  { key: 'tech',      label: 'Tech'       },
  { key: 'charts',    label: 'Charts'     },
  { key: 'comm',      label: 'Comms'      },
  { key: 'people',    label: 'People'     },
  { key: 'ui',        label: 'UI'         },
  { key: 'media',     label: 'Media'      },
  { key: 'misc',      label: 'Misc'       },
]

function resolveIcon(key: string): unknown {
  return ALL_ICONS.find(o => o.key === key)?.component ?? Database
}

// ─── Toast ────────────────────────────────────────────────────────────────────
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })
function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.message = message; toast.type = type; toast.show = true
  setTimeout(() => (toast.show = false), 3000)
}

// ─── Records ──────────────────────────────────────────────────────────────────
const records = ref<RecordItem[]>([
  {
    id: 'data-upload', title: 'Data Upload',
    description: 'Access institutional records, research documents, and archived files shared by the library — organized for easy retrieval.',
    btnLabel: 'Go to Data Upload', link: 'https://drive.google.com/drive/folders/10VykxJ5P2C_OwVsF0Ym_ef4TUuFdq9I6',
    linkType: 'url', iconKey: 'Upload', icon: Upload, visible: true, editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url', iconKey: 'Upload' },
  },
  {
    id: 'cdrom', title: 'CD-ROM',
    description: 'Download digitized CD-ROM contents — archived theses, references, and multimedia resources from physical formats, now online.',
    btnLabel: 'Download CD-ROM', link: '', linkType: 'url', iconKey: 'Disc3', icon: Disc3,
    visible: true, editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url', iconKey: 'Disc3' },
  },
  {
    id: 'ebooks', title: 'E-books GDrive',
    description: 'Explore our collection of digital textbooks, references, and academic materials via Google Drive — available anytime, anywhere.',
    btnLabel: 'Go to E-books', link: 'https://drive.google.com/drive/folders/1-2P2uJiziZHND_8gH5-d20uDmAiPs5gt',
    linkType: 'url', iconKey: 'BookOpen', icon: BookOpen, visible: true, editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url', iconKey: 'BookOpen' },
  },
  {
    id: 'eresources', title: 'E-Resources',
    description: 'Access subscribed databases, journals, and research portals provided by the library to support learning, teaching, and inquiry.',
    btnLabel: 'Go to E-Resources', link: 'eresources', linkType: 'route', iconKey: 'Database', icon: Database,
    visible: true, editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'route', iconKey: 'Database' },
  },
])

// ─── Edit ─────────────────────────────────────────────────────────────────────
function toggleEdit(record: RecordItem) {
  if (record.editing) { cancelEdit(record); return }
  record.draft = { title: record.title, description: record.description, btnLabel: record.btnLabel, link: record.link, linkType: record.linkType, iconKey: record.iconKey }
  record.editing = true
}
function cancelEdit(record: RecordItem) { record.editing = false }
function saveRecord(record: RecordItem) {
  if (!record.draft.title.trim()) { showToast('Title cannot be empty.', 'error'); return }
  if (!record.draft.btnLabel.trim()) { showToast('Button label cannot be empty.', 'error'); return }
  Object.assign(record, { title: record.draft.title, description: record.draft.description, btnLabel: record.draft.btnLabel, link: record.draft.link, linkType: record.draft.linkType, iconKey: record.draft.iconKey, icon: resolveIcon(record.draft.iconKey), editing: false })
  showToast(`"${record.title}" updated successfully!`)
}
function toggleVisibility(record: RecordItem) {
  record.visible = !record.visible
  showToast(`"${record.title}" is now ${record.visible ? 'visible' : 'hidden'} on the Records page.`)
}

// ─── Delete ───────────────────────────────────────────────────────────────────
const deleteTarget = ref<RecordItem | null>(null)
function confirmDelete(record: RecordItem) { deleteTarget.value = record }
function deleteRecord() {
  if (!deleteTarget.value) return
  const name = deleteTarget.value.title
  records.value = records.value.filter(r => r.id !== deleteTarget.value!.id)
  deleteTarget.value = null
  showToast(`"${name}" has been deleted.`)
}

// ─── Add Modal ────────────────────────────────────────────────────────────────
const emptyForm = (): DraftForm => ({ title: '', description: '', btnLabel: '', link: '', linkType: 'url', iconKey: 'Database' })
const addModal = reactive({ open: false, form: emptyForm() })
function openAddModal() { addModal.form = emptyForm(); addModal.open = true }
function closeAddModal() { addModal.open = false }
function addRecord() {
  if (!addModal.form.title?.trim()) { showToast('Title cannot be empty.', 'error'); return }
  if (!addModal.form.btnLabel?.trim()) { showToast('Button label cannot be empty.', 'error'); return }
  const newRecord: RecordItem = {
    id: `record-${Date.now()}`,
    title: addModal.form.title!.trim(), description: addModal.form.description?.trim() ?? '',
    btnLabel: addModal.form.btnLabel!.trim(), link: addModal.form.link?.trim() ?? '',
    linkType: addModal.form.linkType!, iconKey: addModal.form.iconKey,
    icon: resolveIcon(addModal.form.iconKey), visible: true, editing: false,
    draft: { title: '', description: '', btnLabel: '', link: '', linkType: 'url', iconKey: 'Database' },
  }
  records.value.push(newRecord)
  closeAddModal()
  showToast(`"${newRecord.title}" card added successfully!`)
}

// ─── Icon Browser ─────────────────────────────────────────────────────────────
// targetDraft = reference to whichever draft/form we're editing icon for
let iconBrowserTarget: DraftForm | null = null
const iconBrowser = reactive({ open: false, search: '', category: 'all', selected: '' })

const filteredBrowseIcons = computed(() => {
  const q = iconBrowser.search.toLowerCase().trim()
  return ALL_ICONS.filter(o => {
    const catMatch = iconBrowser.category === 'all' || o.category === iconBrowser.category
    const searchMatch = !q || o.label.toLowerCase().includes(q) || o.key.toLowerCase().includes(q)
    return catMatch && searchMatch
  })
})

function openIconBrowser(target: DraftForm) {
  iconBrowserTarget = target
  iconBrowser.search = ''
  iconBrowser.category = 'all'
  iconBrowser.selected = target.iconKey
  iconBrowser.open = true
}

function closeIconBrowser() {
  iconBrowser.open = false
  iconBrowserTarget = null
}

function selectIconFromBrowser(key: string) {
  iconBrowser.selected = key
}

function confirmIconSelection() {
  if (!iconBrowser.selected || !iconBrowserTarget) return
  iconBrowserTarget.iconKey = iconBrowser.selected
  closeIconBrowser()
  showToast(`Icon "${iconBrowser.selected}" selected!`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

.page-header { opacity: 0; animation: fadeUp 0.5s ease forwards; }
.manage-card { opacity: 0; animation: fadeUp 0.45s ease forwards; }
.manage-heading { font-weight: 900; font-size: clamp(1.6rem, 5vw, 3.3rem); line-height: 1.02; margin: 10px 0 8px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Reusable input field */
.field {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(27, 94, 32, 0.2);
  background: #f9fdf9;
  font-size: 13px;
  color: #333;
  font-family: 'Poppins', sans-serif;
  transition: all 0.2s;
}
.field:focus {
  outline: none;
  border-color: rgba(27, 94, 32, 0.4);
  box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.1);
}

/* Card list transition */
.card-list-enter-active { transition: all 0.35s ease; }
.card-list-leave-active { transition: all 0.25s ease; }
.card-list-enter-from   { opacity: 0; transform: translateY(12px); }
.card-list-leave-to     { opacity: 0; transform: translateX(20px); }

/* Modal */
.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-box { animation: modalPop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes modalPop {
  from { transform: scale(0.94) translateY(10px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}

/* Shimmer */
.save-btn, .add-card-btn { position: relative; overflow: hidden; }
.save-btn::after, .add-card-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.45s ease;
}
.save-btn:hover::after, .add-card-btn:hover::after { transform: translateX(100%); }

/* Toast */
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>