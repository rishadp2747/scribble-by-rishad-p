import React, { useEffect, useState } from "react";

import { Accordion, Typography } from "neetoui";
import { NavLink, useHistory } from "react-router-dom";

import articleApi from "apis/public/article";
import categoryApi from "apis/public/category";

const NavBar = ({ setLoading, slug }) => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [menu, setMenu] = useState({});

  const history = useHistory();

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles?.length !== 0) setMenuItems();
  }, [articles]);

  const setMenuItems = () => {
    const menuItems = {};

    categories?.forEach(({ title }) => (menuItems[title] = []));

    articles?.forEach((article, index) => {
      const link = (
        <NavLink
          exact
          key={index}
          to={`/public/articles/${article.slug}/show`}
          activeClassName="text-indigo-500"
          className="mt-4"
        >
          <Typography style="h6" className="py-2 pl-4">
            {article.title}
          </Typography>
        </NavLink>
      );
      menuItems[article.category].push(link);
    });

    let activeArticleLink;

    if (slug) {
      activeArticleLink = `/public/articles/${slug}/show`;
    } else {
      const firstArticle = menuItems[categories[0].title][0];
      activeArticleLink = firstArticle.props.to;
    }

    history.push(activeArticleLink);

    setMenu(menuItems);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      setCategories(response.data?.categories);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articleApi.list();
      setArticles(response.data?.articles);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion defaultActiveKey={0}>
        {categories.map((category, index) => (
          <Accordion.Item key={index} title={category.title}>
            {menu[category.title]}
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default NavBar;
