"use server";
import axios from "axios";
export async function getAllBlogs(page?: string) {
  try {
    let res;
    if (page) {
      res = await axios.get(`https://newsdata.io/api/1/latest`, {
        params: {
          apiKey: process.env.BLOG_API_KEY,
          language: "en",
          image: 1,
          qInMeta: "stock,finance",
          removeduplicate: 1,
          page,
        },
      });
    } else {
      res = await axios.get(`https://newsdata.io/api/1/latest`, {
        params: {
          apiKey: process.env.BLOG_API_KEY,
          language: "en",
          image: 1,
          qInMeta: "stock,finance",
          removeduplicate: 1,
        },
      });
    }

    if (res.status === 200) {
      return { blogs: res.data.results, nextPage: res.data.nextPage };
    }
  } catch (err: any) {
    console.log(err.message);

    return { err: err.message };
  }
}
