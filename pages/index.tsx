/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import {
  Grid,
  Pagination,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import Card from "components/imageCard";
import React, { useEffect } from "react";

const ITEMS_PER_PAGE = 12;

const Image = styled.img`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Home: NextPage = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [modalImage, setModalImage] = React.useState("");
  const [albumFilter, setAlbumFilter] = React.useState("");

  const changePage = (event: any, value: number) => setPage(value);
  const deleteItem = (id: number) =>
    setData(data.filter(({ id: cid }) => cid !== id));

  useEffect(() => {
    setLoading(true);
    fetch("http://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <CircularProgress />;

  const filteredData = data.filter(({ albumId }) =>
    `${albumId}`.includes(albumFilter.trim())
  );
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <TextField
        size="small"
        label="Album ID"
        onChange={({ target: { value } }) => {
          setAlbumFilter(value);
          setPage(1);
        }}
        sx={{ margin: 3 }}
      />
      <Grid container spacing={3}>
        {pageData.map(({ id, title, thumbnailUrl, url }: any) => (
          <Grid
            item
            xs={6}
            sm={3}
            lg={2}
            key={id}
            display="flex"
            justifyContent="center"
          >
            <Card
              onDelete={() => deleteItem(id)}
              onClick={() => setModalImage(url)}
              title={title}
              image={thumbnailUrl}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={page}
        count={pageCount}
        onChange={changePage}
        sx={{ display: "flex", justifyContent: "center", margin: 3 }}
      />
      <Modal open={!!modalImage} onClose={() => setModalImage("")}>
        <Image src={modalImage} alt="Fullsize image" className="modal-image" />
      </Modal>
    </>
  );
};

export default Home;
