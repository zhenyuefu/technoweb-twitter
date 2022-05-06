import React from "react";

export interface ISnackbarState {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "right" | "center";
}

export interface IFormRegister {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IFormLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IFormPost {
  content: string;
  images: IImage[];
}

export interface IImage {
  account_id?: number;
  account_url?: string;
  ad_type?: number;
  ad_url?: string;
  animated?: boolean;
  bandwidth?: number;
  datetime?: number;
  deletehash: string;
  description?: string;
  edited?: string;
  favorite?: boolean;
  has_sound?: boolean;
  height: number;
  id: string;
  in_gallery?: boolean;
  in_most_viral?: boolean;
  is_ad?: boolean;
  link: string;
  name: string;
  size: number;
  tags?: string[];
  title?: string;
  type?: string;
  views?: number;
  width: number;
}

interface IUser {
  _id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: Date;
  avatar?: string;
  introduction?: string;
  bgPicture?: string;
}

interface IPost {
  _id: string;
  author: IUser;
  content: string;
  imagePath?: IImage[];
  createAt: Date;
  comments?: IComment[];
  likes?: IUser[];
  countLikes: number;
  reTweet?: IPost[];
  countReTweet: number;
  isDelete: boolean;
}

export interface ISearchResults {
  users: IUser[];
  posts: IPost[];
}

/**
 * if you are using DOM api directly
 * e.g.
 *     const icon = document.createElement('iconpark-icon') // typeof icon === IconParkIconElement
 * include below type declaration in your project
 *
 */
// interface IconParkIconElement extends HTMLElement {
//   // 包含打包的图标id
//   'icon-id'?: '57' | '58' | '59' | '61' | '62' | '63';
//   // 包含打包的图标标识
//   name?: 'tweet' | 'icon-name2' | 'icon-name3' | 'icon-name4';
//   size?: string;
//   width?: string;
//   height?: string;
//   color?: string;
//   stroke?: string;
//   fill?: string;
//   rtl?: string;
//   spin?: string;
// }
// declare global {
//   interface HTMLElementTagNameMap {
//     'iconpark-icon': IconParkIconElement,
//   }
// }

/**
 * if you are using React JSX with typescript
 * e.g.
 *     <iconpark-icon name="xxx" />
 * include below type declaration in your project (don't forget to import React from 'react')
 *
 */
declare global {
  interface IconParkIconAttributes<T> extends React.HTMLAttributes<T> {
    // 包含打包的图标id
    "icon-id"?: "57" | "58" | "59" | "61" | "62" | "63";
    // 包含打包的图标标识
    name?: "tweet" | "icon-name2" | "icon-name3" | "icon-name4";
    size?: string;
    width?: string;
    height?: string;
    color?: string;
    stroke?: string;
    fill?: string;
    rtl?: string;
    spin?: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      "iconpark-icon": React.DetailedHTMLProps<
        IconParkIconAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
