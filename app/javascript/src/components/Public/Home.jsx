import React, { useEffect, useState } from "react";

import { Typography, Label, Tag } from "neetoui";
import { useParams } from "react-router-dom";

import articleApi from "apis/public/article";

const Home = ({ setLoading }) => {
  const [article, setArticle] = useState();
  const [paragraphs, setParagraphs] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await articleApi.show(slug);
      const article = response.data?.article;
      const paragraphs = article?.body.split("\n");
      setArticle(article);
      setParagraphs(paragraphs.filter(paragraph => paragraph !== ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Typography style="h1">{article?.title}</Typography>
      <div className="flex flex-row space-x-4">
        <Tag
          style="solid"
          size="small"
          color="blue"
          label={article?.category}
        />
        <Label>{article?.date} </Label>
      </div>
      {paragraphs.map((paragraph, index) => (
        <Typography key={index} style="body3">
          {paragraph}
        </Typography>
      ))}
    </div>
  );
};

export default Home;
