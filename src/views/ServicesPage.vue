<template>
  <div class="w-full pb-10 font-['Poppins'] text-gray-800 flex flex-col items-center bg-gray-50 overflow-x-hidden">
    
    <div class="relative mb-6 w-full flex justify-center pl-27">
      
      <div class="bg-[#005a31] text-white text-center py-1 md:pl-32 pr-20 text-2xl md:text-3xl font-black uppercase tracking-[0.2em] relative z-10 shadow-lg w-[100%]
                  [clip-path:polygon(0%_0%,_100%_0%,_96%_50%,_100%_100%,_0%_100%)]">
        Services
        
        <div class="absolute left-0 top-full w-0 h-0 border-t-[15px] border-t-[#002d1a] border-l-[15px] border-l-transparent">
        </div>
      </div>
    </div>

    <div class="max-w-7xl px-8 w-full pb-10"> 
      <p class="text-gray-800 leading-relaxed text-lg font-medium text-center mb-16 pl-10 pb-10 pt-5">
        The 
        <span class="font-[900] text-[#005a31] text-2xl tracking-tight mx-1">
          CSU Library
        </span> 
        provides the following services:
      </p>

      <div class="grid grid-cols-1 gap-x-30 gap-y-8 items-stretch pl-5">
        <div v-for="(service, index) in libraryServices" :key="index" 
             class="flex items-start gap-5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group">
          
          <div class="w-2 h-7 bg-[#d35400] shrink-0 group-hover:h-10 transition-all"></div>
          
          <div>
            <h3 class="font-black text-lg text-gray-950 mb-2 leading-tight uppercase tracking-tight">
              {{ service.title }}
            </h3>
            <p class="text-black-700 leading-relaxed text-sm font-medium">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const libraryServices = [
  { title: "Online Public Access Catalog (OPAC)", description: "- where terminals are provided for available library materials. It is the electronic version of the paper Card Catalog." },
  { title: "Audio Visual Room", description: "- for viewing and borrowing of digital interactive CDs and DVDs." },
  { title: "eLibrary", description: "- access to online resources such as online journals and magazines, research on educational websites, e-books, video streaming and printing." },
  { title: "Automated Circulation", description: "- borrowing and returning of books are computerized. It also records daily performance and provides bibliographic information." },
  { title: "Laptop Area", description: "- this service allow clients to plug their laptops on designated area." },
  { title: "OPAC Tutorial", description: "- to search for the material, the OPAC has nine options available: title, author, call number, subject, series, keyword, category, power and events. Type the search word in the appropriate box." },
  { title: "Library Resource Sharing", description: "- accommodates the researcher from other schools and government organizations." },
  { title: "Library Orientation", description: "- provides a good understanding of the library's objectives, facilities, resources and services." },
  { title: "Library Instruction", description: "- its goal is to teach, educate and evaluate students on how to use the library effectively." },
  { title: "Book Display/New Arrival", description: "- bibliographic of newly processed books is posted on the bulletin board. These books are displayed in the new arrival area. Members of the faculty are given the priority to examine and borrow these books." },
  { title: "Bibliographic Assistance", description: "- librarians prepare bibliographies on certain subjects upon request by students and faculty." },
  { title: "Acquisition List", description: "- technical librarian prepares and distribute acquisition lists which enumerate the materials acquired by the library in certain period within the semester. The lists are written in bibliographic format." },
  { title: "Book Selection", description: "- faculty are encouraged actively to participate in the selection of books for the library. Forms on which to write the complete bibliographic information of the books to be recommended are available at the librarian's desk." }
];
</script>