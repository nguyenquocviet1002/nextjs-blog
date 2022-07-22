import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import axios from 'axios';

const postsDirectory = path.join(process.cwd(), 'posts');

// ---- get post on local
// export function getSortedPostsData() {
//   const fileName = fs.readdirSync(postsDirectory);
//   const allPostsData = fileName.map((fileName) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");
//     const matterResult = matter(fileContents);
//     return {
//       id,
//       ...matterResult.data,
//     };
//   });
//   console.log(allPostsData);
//   return allPostsData.sort(({ date: a }, { date: b }) => {
//     if (a < b) {
//       return 1;
//     } else if (a > b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// }

// export function getAllPostIds() {
//   const fileName = fs.readdirSync(postsDirectory);
//   return fileName.map((fileName) => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, ''),
//       },
//     };
//   });
// }

// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContent = fs.readFileSync(fullPath, 'utf8');
//   const matterResult = matter(fileContent);
//   const processedContent = await remark().use(html).process(matterResult.content);
//   const contentHtml = processedContent.toString();
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data,
//   };
// }

// ------ get post on api
export async function getSortedPostsData() {
  const allPostsData = await axios
    .get('https://61a1fe86014e1900176de816.mockapi.io/posts')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getAllPostIds() {
  const allPostsId = await axios
    .get('https://61a1fe86014e1900176de816.mockapi.io/posts')
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  const id = allPostsId.map((allPostId) => {
    return {
      params: {
        id: allPostId.id,
      },
    };
  });
  return id;
}

export async function getPostData(id) {
  const post = await axios
    .get(`https://61a1fe86014e1900176de816.mockapi.io/posts/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return post;
}
