import React, { useEffect, useState } from "react";

import { Plus, Search, Close, Check } from "neetoicon";
import { Typography, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoryApi from "apis/category";
import { DEFAULT_CATEGORY_ACTIONS } from "components/Dashboard/constant";
import useDebounce from "hooks/useDebounce";

const CategoryMenu = ({
  setLoading,
  selectedFilters,
  handleSelectedFilters,
}) => {
  const [categories, setCategories] = useState([]);
  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [searchCategories, setSearchCategories] = useState([]);
  const [categoryActions, setCategoryActions] = useState(
    DEFAULT_CATEGORY_ACTIONS
  );

  const SEARCH_KEYWORD = useDebounce(categoryActions.search.value, 1000);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (SEARCH_KEYWORD) {
      handleSearchCategory();
    } else {
      setCategories(searchCategories);
    }
  }, [SEARCH_KEYWORD]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      const categories = response.data?.categories;
      setCategories(categories);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryActionValueChange = e => {
    const action = e.target.id;
    const newCategoryActionValue = categoryActions;

    if (e.target.value.trim() === "") {
      newCategoryActionValue[action].error = "Required";
    } else {
      newCategoryActionValue[action].error = "";
    }

    newCategoryActionValue[action].value = e.target.value;
    setCategoryActions({ ...newCategoryActionValue });
  };

  const handleAddCategory = async () => {
    const error = categoryActions.add.value.trim() === "";
    const errorMessage = error && "Required";

    if (error) {
      const addActionStatus = { error: errorMessage, value: "", show: true };
      setCategoryActions(categoryAction => ({
        ...categoryAction,
        add: addActionStatus,
      }));
    } else {
      setLoading(true);

      try {
        const payload = { category: { title: categoryActions.add.value } };
        const response = await categoryApi.create(payload);
        response.data?.notice && fetchCategories();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchCategory = () => {
    const REMOVE_SPACES_BETWEEN_WORDS = /\s+/g;
    const keyword = SEARCH_KEYWORD.trim()
      .toLowerCase()
      .replace(REMOVE_SPACES_BETWEEN_WORDS, " ");

    setCategories(
      categories.filter(({ title }) => title.toLowerCase().includes(keyword))
    );
  };

  const handleAddCategoryIcon = () => {
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      add: { show: true, value: "" },
    }));
  };

  const handleSearchCategoryIcon = () => {
    setSearchCategories(categories);
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      search: { show: true },
    }));
  };

  const handleActionClose = e => {
    const action = e.target.id.split("C")[0];
    const newCategoryActionValue = categoryActions;
    newCategoryActionValue[action].show = false;

    searchCategories.length !== 0 && setCategories(searchCategories);
    setCategoryActions({ ...newCategoryActionValue });
  };

  const ACTIONS = {
    search: <Search size={18} onClick={handleSearchCategoryIcon} />,
    add: <Plus size={18} onClick={handleAddCategoryIcon} />,
    searchClose: (
      <Close id="searchClose" size={18} onClick={handleActionClose} />
    ),
    addClose: <Close id="addClose" size={18} onClick={handleActionClose} />,
  };

  const CATEGORY_ACTION_ICONS = [
    {
      icon: () =>
        categoryActions.search.show ? ACTIONS.searchClose : ACTIONS.search,
    },
    {
      icon: () => (categoryActions.add.show ? ACTIONS.addClose : ACTIONS.add),
    },
  ];

  const handleActiveMenu = title => {
    if (selectedFilters.category === title) {
      setIsActiveCategory(false);
      handleSelectedFilters({ category: "" });
    } else {
      setIsActiveCategory(true);
      handleSelectedFilters({ category: title });
    }
  };

  return (
    <>
      <MenuBar.SubTitle iconProps={CATEGORY_ACTION_ICONS}>
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      {categoryActions.search.show && (
        <Input
          id="search"
          suffix={<Search />}
          className="my-2"
          onChange={handleCategoryActionValueChange}
        />
      )}

      {categoryActions.add.show && (
        <Input
          id="add"
          className="my-2"
          value={categoryActions.add.value}
          error={categoryActions.add.error}
          onChange={handleCategoryActionValueChange}
          suffix={
            <Check className="cursor-pointer" onClick={handleAddCategory} />
          }
        />
      )}
      {categories.map(({ title, count }, index) => (
        <MenuBar.Block
          key={index}
          label={title}
          count={count}
          active={isActiveCategory && selectedFilters.category === title}
          onClick={() => handleActiveMenu(title)}
        />
      ))}
    </>
  );
};

export default CategoryMenu;
