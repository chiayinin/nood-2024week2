import mongoose from 'mongoose';

// 定義 Schema 格式規格
const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
      }
    ],
    context: {
      type: String,
      required: [true, 'Content 未填寫']
    },
    type: {
      type: String,
      enum: ['group', 'person'],
      required: [true, '貼文類型 type 未填寫'],
    },
    image: {
      type: String,
      default: ''
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
);

const Post = mongoose.model('posts', postSchema);

export default Post;
