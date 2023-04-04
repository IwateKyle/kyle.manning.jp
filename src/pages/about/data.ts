import PocketBase from "pocketbase";

export const load = async () => {
  let pb;
  let posts;
  
  try {
    pb = new PocketBase("http://localhost:8090");
    posts = await pb.collection("posts").getList(1, undefined, {
      filter: 'slug = "about"'
    });
  } catch (e) {
    
  }

  // fetch a paginated records list
  if (posts.totalItems > 0) {
    // const url = pb.getFileUrl(
      // posts.items[0].expand.author,
      // posts.items[0].expand.author.avatar,
      // "thumb=200x200",
    // );
    // posts.items[0].expand.author.avatar = url;
    // console.log(url);
    return { document: posts.items[0] };
  }
  return { body: "" };
};
