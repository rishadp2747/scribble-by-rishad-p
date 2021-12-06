import React, { useEffect, useState } from "react";

import { Plus, Search, Highlight, Delete } from "neetoicon";
import { Typography, Dropdown, Button, Input, Checkbox, Table } from "neetoui";
import {
  MenuBar,
  Scrollable,
  Container as PageContainer,
} from "neetoui/layouts";

import articleApi from "apis/article";
import CategoryMenu from "components/Dashboard/CategoryMenu";
import {
  DEFAULT_TABLE_COLUMNS,
  DEFAULT_ARTICLE_FILTERS,
  STATUSES,
} from "components/Dashboard/constant";
import useDebounce from "hooks/useDebounce";

const Dashboard = ({ setLoading }) => {
  const [articles, setArticles] = useState([]);
  const [articleCounts, setArticleCounts] = useState();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);
  const [selectedFilters, setSelectedFilters] = useState(
    DEFAULT_ARTICLE_FILTERS
  );

  const SEARCH_KEYWORD = useDebounce(selectedFilters.title, 1000);

  useEffect(() => {
    fetchArticles(articles);
  }, []);

  useEffect(() => {
    filterArticles(articles);
  }, [selectedFilters, articles, SEARCH_KEYWORD]);

  useEffect(() => {
    if (SEARCH_KEYWORD) {
      searchArticles();
    }
  }, [SEARCH_KEYWORD]);

  const ARTICLE_ACTIONS = article => (
    <div className="flex flex-row space-x-2">
      <Button
        style="text"
        icon={() => <Delete size={16} />}
        onClick={() => deleteArticle(article)}
      />

      <Button
        style="text"
        to={`/articles/${article.id}/edit`}
        icon={() => <Highlight size={16} />}
      />
    </div>
  );

  const CUSTOM_TABLE_COLUMNS = tableColumns
    .filter(({ show }) => show)
    .map(({ data }) => data);

  const TABLE_COLUMNS = [
    ...CUSTOM_TABLE_COLUMNS,
    {
      dataIndex: "",
      key: "",
      render: article => ARTICLE_ACTIONS(article),
      width: 20,
    },
  ];

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await articleApi.list();
      setArticleCounts(response.data?.counts);
      setArticles(response.data?.articles);
    } finally {
      setLoading(false);
    }
  };

  const handleColumnChange = e => {
    setTableColumns(
      tableColumns.map(column => {
        if (column.data.key === e.target.id) {
          column.show = !column.show;
        }

        return column;
      })
    );
  };

  const handleSelectedFilters = filterOption => {
    setSelectedFilters(filter => ({ ...filter, ...filterOption }));
  };

  const filterArticles = articles => {
    setFilteredArticles(
      articles.filter(article => {
        if (selectedFilters.status !== "all") {
          return (
            article.status === selectedFilters.status &&
            article.category === selectedFilters.category
          );
        }

        return article.category === selectedFilters.category;
      })
    );
  };

  const searchArticles = () => {
    // To find multitple space between words in a sentence
    const REMOVE_SPACES_BETWEEN_WORDS = /\s+/g;
    const keyword = SEARCH_KEYWORD.trim()
      .toLowerCase()
      .replace(REMOVE_SPACES_BETWEEN_WORDS, " ");

    filterArticles(
      articles.filter(({ title }) => title.toLowerCase().includes(keyword))
    );
  };

  const deleteArticle = async article => {
    const decision = confirm("Are you sure you want to delete this article");
    if (decision) {
      setLoading(true);
      try {
        const response = await articleApi.destroy(article.id);
        response.data?.notice &&
          setArticles(articles.filter(({ id }) => id !== article.id));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex w-screen">
      <MenuBar showMenu={true} title="Articles">
        {STATUSES.map((status, index) => (
          <MenuBar.Block
            key={index}
            label={status}
            className="capitalize"
            count={articleCounts && articleCounts[status]}
            active={status === selectedFilters.status}
            onClick={() => handleSelectedFilters({ status: status })}
          />
        ))}
        <CategoryMenu
          setLoading={setLoading}
          selectedFilters={selectedFilters}
          handleSelectedFilters={handleSelectedFilters}
        />
      </MenuBar>
      <PageContainer>
        <div className="flex flex-col w-full py-4">
          <div className="flex flex-row w-4/5 h-8 ml-auto space-x-3">
            <Input
              size="small"
              prefix={<Search size={20} />}
              placeholder="Search article title"
              value={selectedFilters.title}
              onChange={e => handleSelectedFilters({ title: e.target.value })}
            />
            <Dropdown
              closeOnSelect={false}
              label="Columns"
              buttonStyle="text"
              position="bottom-end"
              className="h-8 bg-gray-200 border"
            >
              <div className="p-4 space-y-4">
                <Typography style="h5">Columns</Typography>
                {DEFAULT_TABLE_COLUMNS.map(({ show, data }, index) => (
                  <Checkbox
                    checked={show}
                    key={index}
                    label={data.title}
                    id={data.key}
                    onChange={handleColumnChange}
                  />
                ))}
              </div>
            </Dropdown>
            <Button
              icon={Plus}
              iconPosition="right"
              label="Add New Article"
              className="bg-indigo-500"
              to="/articles/creates"
            />
          </div>

          <Typography style="h4" className="py-4">
            {articles?.length} Articles
          </Typography>

          <Scrollable>
            <Table
              rowSelection={false}
              columnData={TABLE_COLUMNS}
              rowData={filteredArticles}
            />
          </Scrollable>
        </div>
      </PageContainer>
    </div>
  );
};

export default Dashboard;
