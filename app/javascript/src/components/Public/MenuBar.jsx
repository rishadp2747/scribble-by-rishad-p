import React, { useEffect, useState } from "react";

import { Accordion, Typography } from "neetoui";
import { NavLink, useHistory } from "react-router-dom";

import articleApi from "apis/article";
import categoryApi from "apis/category";

const MenuBar = ({ setLoading }) => {
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
    let activeLinkId = "";

    categories?.forEach(({ title }) => (menuItems[title] = []));

    articles?.forEach((article, index) => {
      index === 0 && (activeLinkId = article.id);
      const component = (
        <NavLink
          exact
          to={`/public/articles/${article.id}/show`}
          activeClassName="text-indigo-500"
          className="mt-4"
        >
          <Typography style="h6" className="py-2 pl-4">
            {article.title}
          </Typography>
        </NavLink>
      );
      menuItems[article.category].push(component);
    });

    history.push(`articles/${activeLinkId}/show`);
    setMenu(menuItems);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      const categories = response.data?.categories;
      setCategories(categories.filter(category => category.count > 0));
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

export default MenuBar;
