// APIs
const ALL_POST = "https://openapi.programming-hero.com/api/retro-forum/posts";
const LATEST_POST =
   "https://openapi.programming-hero.com/api/retro-forum/latest-posts";

// DOM References
const discussSection = document.getElementById("discuss-section");
const allPostsSection = document.getElementById("all-posts-section");
const latestPostsSection = document.getElementById("latest-posts-section");
const markedReadLists = document.getElementById("marked-read-lists");
const markedReadCounter = document.getElementById("marked-read-counter");
const search = document.getElementById("search");

// Global variables
let all_posts = [];
let markAsReadCount = 0;

const fetchAllPosts = async () => {
   const response = await fetch(ALL_POST);
   if (!response.ok) return;
   const data = await response.json();
   all_posts = data.posts;
   showAllPosts(all_posts);
};

const showAllPosts = (posts) => {
   if (!posts) return;
   const postsHTML = posts.reduce(
      (posts, currentPost) => posts + createDiscussPostCard(currentPost),
      ""
   );
   allPostsSection.innerHTML = postsHTML;
};

const fetchAndShowLatestPosts = async () => {
   const response = await fetch(LATEST_POST);
   if (!response.ok) return;
   const posts = await response.json();
   const postsHTML = posts.reduce(
      (posts, currentPost) => posts + createLatestPostCard(currentPost),
      ""
   );
   latestPostsSection.innerHTML = postsHTML;
};

const createDiscussPostCard = ({
   id,
   category,
   author,
   image,
   title,
   description,
   isActive,
   comment_count,
   view_count,
   posted_time,
}) => {
   return `
<article class="p-6 lg:p-10 grid bg-gray-100 rounded-3xl text-gray-500">
   <header class="grid grid-cols-[4rem_1fr] lg:grid-cols-[4.5rem_1fr] gap-x-3 lg:gap-x-6">
      <div class="relative w-full aspect-square shrink-0">
         <img src=${image} class="w-full h-full rounded-2xl" />
         <div class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full ${
            isActive ? "bg-success" : "bg-danger"
         } border-2 border-white z-50"></div>
      </div>

      <div class="grid">
         <div
            class="flex items-center gap-x-5 text-sm font-medium text-gray-600 flex-wrap"
         >
            <p># ${category}</p>
            <p>Author: ${author.name}</p>
         </div>
         <h2 class="mt-1 font-bold lg:text-xl text-darkGray">
            ${title}
         </h2>
      </div>
   </header>

   <main
      class="grid lg:grid-cols-[4.5rem_1fr] gap-x-3 lg:gap-x-6"
   >
      <span></span>

      <div class="grid">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 596 2" class="py-3 lg:py-6 order-2 lg:order-3 w-full">
            <path
               stroke="#12132D" stroke-width="1" stroke-dasharray="5 5" stroke-opacity="0.3"
               d="M0 .5h596"
            />
         </svg>

         <p class="lg:pr-6 order-3 lg:order-2">
            ${description}
         </p>

         <div
            class="mt-6 lg:mt-0 flex items-center justify-between order-4 flex-wrap gap-y-2"
         >
            <ul class="flex gap-x-6 items-center text-sm sm:text-base">
               <li class="flex items-center gap-x-2 lg:gap-x-3">
                  <img src="images/Message.svg" alt="Message" class="w-6 h-6" />
                  <span>${comment_count}</span>
               </li>
               <li class="flex items-center gap-x-2 lg:gap-x-3">
                  <img src="images/Eye.svg" alt="Eye" class="w-6 h-6" />
                  <span>${view_count}</span>
               </li>
               <li class="flex items-center gap-x-2 lg:gap-x-3">
                  <img src="images/Clock.svg" alt="Clock" class="w-6 h-6" />
                  <span>${posted_time}</span>
               </li>
            </ul>

            <button onclick=markAsRead(${id})>
               <img src="images/Email.svg" alt="Email" class="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
         </div>
      </div>
   </main>
</article>`;
};

const createLatestPostCard = ({
   author,
   cover_image,
   description,
   profile_image,
   title,
}) => {
   const { name, posted_date, designation } = author;
   return `
   <article class="p-6 rounded-3xl border text-gray-500 max-w-96">
   <img src=${cover_image} class="h-48 w-full rounded-xl" />

   <div class="mt-6 mb-3 flex items-center gap-x-2">
      <img src="images/Calendar.svg" alt="Calendar" class="w-6 h-6" />
      <time>${posted_date ? posted_date : "No publish date"}</time>
   </div>

   <h1 class="font-extrabold text-lg text-darkGray">
      ${title}
   </h1>
   <p class="mt-3 mb-4">
      ${description}
   </p>

   <div class="flex items-center gap-x-4">
      <img src=${profile_image} class="w-12 h-12 shrink-0 rounded-full" />
      <div class="grid gap-y-1">
         <h1 class="text-darkGray font-bold">${name}</h1>
         <h4>${designation ? designation : "Unknown"}</h4>
      </div>
   </div>
</article>`;
};

const createLoadingSpin = () => {
   return `
<div class="flex items-center justify-center">
   <svg
      xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24"
      class="animate-spin w-12 h-12"
   >
      <linearGradient
         id="a" x1="1" x2="23" y1="12" y2="12"
         gradientTransform="translate(-1.09 -1.09) scale(1.0909)"
         gradientUnits="userSpaceOnUse"
      >
         <stop offset="0" stop-color="#797dfc" />
         <stop offset="1" stop-color="#464995" />
      </linearGradient>
      <path
         fill="url(#a)"
         d="M12 0c-.655 0-1.09.436-1.09 1.09s.435 1.092 1.09 1.092A9.777 9.777 0 0 1 21.818 12 9.777 9.777 0 0 1 12 21.818 9.777 9.777 0 0 1 2.182 12c0-.655-.437-1.09-1.091-1.09S0 11.344 0 12c0 6.654 5.345 12 12 12 6.654 0 12-5.346 12-12S18.654 0 12 0z"
         data-original="url(#a)"
      />
   </svg>
</div>`;
};

const showNoResultView = () => {
   allPostsSection.innerHTML = `
<div class="grid justify-items-center">
   <img src="images/NoResult.png" alt="NoResult" class="w-full max-w-xs mx-auto" />
   <h1 class="font-bold text-xl">No matching search results</h1>
   <p class="mt-2 text-gray-500">Make sure all words are spelled correctly.</p>
</div>`;
};

const showAllPostLoadingSkeleton = () => {
   allPostsSection.innerHTML = `
<article class="animate-pulse p-6 lg:p-10 grid bg-gray-100 rounded-3xl">
   <header class="grid grid-cols-[4rem_1fr] lg:grid-cols-[4.5rem_1fr] gap-x-3 lg:gap-x-6"   >
      <div class="w-full aspect-square shrink-0">
         <div class="w-full h-full rounded-2xl bg-gray-300"></div>
      </div>

      <div class="grid items-center">
         <div class="w-full max-w-56 h-5 bg-gray-300 rounded"></div>
         <div class="w-full max-w-md h-8 mt-1 rounded bg-gray-300"></div>
      </div>
   </header>

   <main class="grid lg:grid-cols-[4.5rem_1fr] gap-x-3 lg:gap-x-6">
      <span></span>

      <div class="grid">
         <div class="my-3 lg:my-6 order-2 lg:order-3 w-full border border-gray-300"></div>
         <div class="lg:mt-2 h-16 w-full lg:mx lg:pr-6 order-3 lg:order-2 bg-gray-300 rounded"></div>
         <div class="mt-6 lg:mt-0 flex justify-between order-4 flex-wrap gap-y-2 shrink-0">
            <ul class="flex gap-x-3 lg:gap-x-6">
               <div class="min-w-20 lg:min-w-32 w-full h-6 lg:h-8 bg-gray-300 rounded"></div>
               <div class="min-w-20 lg:min-w-32 w-full h-6 lg:h-8 bg-gray-300 rounded"></div>
               <div class="min-w-20 lg:min-w-32 w-full h-6 lg:h-8 bg-gray-300 rounded"></div>
            </ul>
            
            <div class="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-300"></div>
         </div>
      </div>
   </main>
</article>`;
};

const showLatesPostLoadingSkeleton = () => {
   const skeleton = `
<article class="animate-pulse grid p-6 w-full rounded-3xl border text-gray-500 max-w-96">
   <div class="h-48 w-full rounded-xl bg-gray-300"></div>

   <div class="mt-6 mb-3 flex items-center gap-x-2">
      <div class="w-6 h-6 bg-gray-300 rounded"></div>
      <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
   </div>

   <div class="h-8 bg-gray-300 rounded"></div>
   <div class="h-16 mt-3 mb-4 bg-gray-300 rounded"></div>

   <div class="flex items-center gap-x-4">
      <div class="w-12 h-12 shrink-0 bg-gray-300 rounded-full" ></div>
      <div class="grid gap-y-1 w-full">
         <div class="h-8 w-full bg-gray-300 rounded"></div>
         <div class="h-7 max-w-48 bg-gray-300 rounded"></div>
      </div>
   </div>
</article>`;
   latestPostsSection.innerHTML = skeleton.repeat(3);
};

const markAsRead = (id) => {
   if (all_posts.length === 0) return;
   const matchedPost = all_posts.find((post) => post.id === id);
   if (!matchedPost) return;
   const { title, view_count } = matchedPost;

   const item = `
<li class="p-4 flex items-center gap-x-2 bg-white rounded-2xl">
   <h1 class="w-full font-semibold">
      ${title}
   </h1>
   <img src="images/Eye.svg" alt="Eye" class="w-6 h-6 shrink-0" />
   <span class="text-gray-500">${view_count}</span>
</li>`;

   markedReadLists.innerHTML = markedReadLists.innerHTML + item;
   markAsReadCount++;
   markedReadCounter.textContent = markAsReadCount;
};

const searchByCategory = () => {
   showAllPostLoadingSkeleton();
   const category = search.value.trim().toLowerCase();
   if (category === "") return;
   const posts = all_posts.filter(
      (post) => post.category.toLowerCase() === category
   );
   discussSection.scrollIntoView({ behavior: "smooth" });
   setTimeout(() => {
      posts.length > 0 ? showAllPosts(posts) : showNoResultView();
   }, 2000);
};

document.addEventListener("DOMContentLoaded", async () => {
   showAllPostLoadingSkeleton();
   showLatesPostLoadingSkeleton();
   await fetchAllPosts();
   await fetchAndShowLatestPosts();
});
