import React, { useEffect, useState } from "react";

import { Plus, Search, Highlight, Delete } from "neetoicon";
import { Typography, Dropdown, Button, Input, Checkbox, Table } from "neetoui";
import {
  MenuBar,
  Scrollable,
  Container as PageContainer,
} from "neetoui/layouts";

import articleApi from "apis/article";
import Container from "components/Common/Container";
import CategoryMenu from "components/Dashboard/CategoryMenu";
import {
  DEFAULT_TABLE_COLUMNS,
  DEFAULT_ARTICLE_FILTERS,
  STATUSES,
} from "components/Dashboard/constant";

const Dashboard = ({ setLoading, loading }) => {
  const [articles, setArticles] = useState([]);
  const [articleCounts, setArticleCounts] = useState();
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_ARTICLE_FILTERS);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticle();
  }, [selectedFilter, articles]);

  const ARTICLE_ACTIONS = article => (
    <div className="flex flex-row space-x-4">
      <Delete size={16} onClick={() => deleteArticle(article)} />
      <Highlight size={16} />
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

  const handleSelectedFilter = filterOption => {
    setSelectedFilter(filter => ({ ...filter, ...filterOption }));
  };

  const filterArticle = () => {
    setFilteredArticles(
      articles.filter(article => {
        if (selectedFilter.status !== "all") {
          return (
            article.status === selectedFilter.status &&
            article.category === selectedFilter.category
          );
        }

        return article.category === selectedFilter.category;
      })
    );
  };

  const deleteArticle = () => {
    // console.log(article);
  };

  return (
    <Container loading={loading}>
      <div className="flex w-screen">
        <MenuBar showMenu={true} title="Articles">
          {STATUSES.map((status, index) => (
            <MenuBar.Block
              key={index}
              label={status}
              className="capitalize"
              count={articleCounts && articleCounts[status]}
              active={status === selectedFilter.status}
              onClick={() => handleSelectedFilter({ status: status })}
            />
          ))}
          <CategoryMenu
            setLoading={setLoading}
            selectedFilter={selectedFilter}
            handleSelectedFilter={handleSelectedFilter}
          />
        </MenuBar>
        <PageContainer>
          <div className="flex flex-col w-full py-4">
            <div className="flex flex-row w-4/5 h-8 ml-auto space-x-3">
              <Input
                size="small"
                prefix={<Search size={20} />}
                placeholder="Search article title"
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
                to="/articles/create"
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
                className="border border-red-500 "
              />
            </Scrollable>
          </div>
        </PageContainer>
      </div>
    </Container>
  );
};

export default Dashboard;
