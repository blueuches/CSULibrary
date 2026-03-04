<template>
  <div class="w-full py-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

      <!-- LEFT SIDE -->
      <div>
        <h2 class="text-2xl font-bold text-[#1b5e20] mb-2">
          E-Resources
        </h2>

        <p class="text-gray-600 mb-6 text-sm leading-relaxed">
          Access academic databases, journals, digital libraries, and open-access
          platforms to support research, instruction, and lifelong learning.
        </p>

        <!-- Search -->
        <input
          v-model="search"
          type="text"
          placeholder="Search e-resources..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
        />
      </div>

      <!-- RIGHT SIDE -->
      <div class="max-h-[750px] overflow-y-auto pr-2 space-y-4">

        <div
          v-for="(resource, index) in filteredResources"
          :key="index"
          class="bg-white shadow-sm border rounded-xl p-5 hover:shadow-md transition"
        >
          <h3 class="font-semibold text-[#1b5e20] text-sm">
            {{ resource.name }}
          </h3>

          <p class="text-xs text-gray-600 mt-2 leading-relaxed">
            {{ resource.description }}
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const resources = [
  { name: "Philippine eLib", description: "A collaborative project of NLP, UP, DOST, DA, and CHED providing access to Philippine scholarly resources." },
  { name: "InfoTrac", description: "Provides instant access to leading journals and reference sources with powerful discovery tools." },
  { name: "Aardvarknet.info (Asian Resources for Librarians)", description: "Links to free Asian databases and full-text journals across multiple disciplines." },
  { name: "CiteSeer", description: "Scientific digital library and search engine focusing on computer and information science literature." },
  { name: "College & Research Libraries (C&RL)", description: "Official scholarly journal of the Association of College & Research Libraries (ALA division)." },
  { name: "D-Lib Magazine", description: "Electronic publication focusing on digital library research and development." },
  { name: "Directory of Open Access Journals (DOAJ)", description: "Provides access to quality-controlled open access scientific journals." },
  { name: "eBook Directory", description: "Directory of free downloadable eBooks across various subjects." },
  { name: "ENR: Engineering News-Record", description: "Engineering and construction industry news, data, and analysis." },
  { name: "Google Scholar", description: "Search engine for scholarly literature including peer-reviewed papers and theses." },
  { name: "HighWire Press", description: "Provides access to millions of articles from thousands of journals including PubMed." },
  { name: "Health Research and Development Information Network (HERDIN)", description: "Database of Philippine health research citations and bibliographic records." },
  { name: "HINARI", description: "Provides low-cost or free access to biomedical journals in developing countries." },
  { name: "Homiletic and Pastoral Review", description: "Respected pastoral magazine serving clergy and lay readers." },
  { name: "Journal of Philippine Librarianship (JPL)", description: "Annual publication covering library and information studies in the Philippines." },
  { name: "Library Journal", description: "Professional publication covering library news, reviews, and trends." },
  { name: "OAIster", description: "Searchable collection of freely available academic digital resources." },
  { name: "Open Access Journals", description: "Collection of open access journals useful across disciplines." },
  { name: "PLoS Biology", description: "Peer-reviewed open access journal published by the Public Library of Science." },
  { name: "PLOS One", description: "Open access journal providing research metrics, citations, and impact indicators." },
  { name: "POPLINE", description: "Database covering population, family planning, fertility, and health policy topics." },
  { name: "Project Euclid", description: "Scholarly communication platform for mathematics and statistics research." },
  { name: "PubChem", description: "NIH database providing information on small organic molecules and biomedical research." },
  { name: "Social Science Research Network (SSRN)", description: "Database of scholarly abstracts and downloadable working papers." },
  { name: "World Population Data", description: "Provides demographic data and global population projections." },
  { name: "OMICS International", description: "Open access publisher and conference organizer across multiple disciplines." },
  { name: "Science Publishing Group", description: "Academic publisher offering journal and conference publishing services." },
  { name: "Bookboon", description: "Online publisher of student-focused eBooks in engineering, IT, and business." },
  { name: "Springer", description: "Global publisher providing scientific, technical, and medical research content." },
  { name: "Freebookcentre.net", description: "Links to thousands of free online technical books in computer science and more." },
  { name: "GetFreeEbooks", description: "Platform connecting authors and readers through free legal eBooks." },
  { name: "Google eBookstore", description: "Provides access to free books in various genres with ratings and reviews." },
  { name: "Project Gutenberg", description: "Digital library offering over one million free classic and historical eBooks." },
  { name: "Internet Archive", description: "Non-profit digital library providing historical and academic books." },
  { name: "ManyBooks.net", description: "Offers over 29,000 free eBooks compatible with various e-readers." },
  { name: "LibriVox", description: "Platform offering thousands of free audiobooks including classics." },
  { name: "PDFDRIVE", description: "Search engine allowing preview and download of millions of PDF files." }
]

const filteredResources = computed(() =>
  resources.filter(r =>
    r.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped>
</style>