export const STATUSES = ["all", "draft", "published"];

export const DEFAULT_ARTICLE_FILTERS = { status: "all", category: "" };

export const DEFAULT_TABLE_COLUMNS = [
  {
    show: true,
    data: {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      ellipsis: true,
    },
  },
  {
    show: true,
    data: {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 70,
      ellipsis: true,
    },
  },
  {
    show: true,
    data: {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 80,
      ellipsis: true,
    },
  },
  {
    show: true,
    data: {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      ellipsis: true,
    },
  },
  {
    show: true,
    data: {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 70,
      ellipsis: true,
    },
  },
];

export const DEFAULT_CATEGORY_ACTIONS = {
  search: {
    show: false,
    value: "",
    error: "",
  },
  add: {
    show: false,
    value: "",
    error: "",
  },
};
