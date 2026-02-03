import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false
    }
  }

  async getPost(slug){ // to get single post
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error)
        return false
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]){ // to get all posts // queries is a variable we are using Query to get the posts which have status active for this we use indexes in the database
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            // [ another way of writing Query
            //     Query.equal("status", "active")
            // ]
            queries,
        )
    } catch (error) {
        console.log("Appwrite service :: getPosts :: error", error)
        return false
    }
  }

  // file upload service/method

  async uploadFile(file){
    try {
        return await this.bucket.createFile( // this will return id of file and we will store that in a variable and can pass it to deleteFile method
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error)
    }
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error)
        return false
    }
  }

  getFilePreview(fileId){ // response of this method is very fast so we will not use async
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
  }
}

const service = new Service();

export default service;
