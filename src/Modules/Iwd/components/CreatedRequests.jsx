import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Container, Table, Button, Title, Loader, Grid } from "@mantine/core";
import { CaretLeft } from "@phosphor-icons/react";
import axios from "axios";
import ViewRequestFile from "./ViewRequestFile";
import { IWD_ROUTES } from "../routes/iwdRoutes";

function CreatedRequests({ setActiveTab }) {
  const role = useSelector((state) => state.user.role);
  const [loading, setLoading] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  const [createdRequestsList, setRequestsList] = useState([]);
  useEffect(() => {
    const getCreatedRequests = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(IWD_ROUTES.CREATED_REQUESTS, {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            role,
          },
        });
        setRequestsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCreatedRequests();
  }, [role]);
  console.log(createdRequestsList);

  return (
    <Container style={{ fontFamily: "Arial, sans-serif" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : !selectedRequest ? (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          <Title size="26px" align="center" style={{ marginBottom: "10px" }}>
            Created Requests
          </Title>
          <Table highlightOnHover>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Area</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {hardcoded.map((request, index) => ( */}
              {createdRequestsList.map((request, index) => (
                <tr key={index} id={request.id}>
                  <td>{request.request_id}</td>
                  <td>{request.name}</td>
                  <td>{request.description}</td>
                  <td>{request.area}</td>
                  <td>{request.requestCreatedBy}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => handleViewRequest(request)}
                      style={{ backgroundColor: "#1E90FF", color: "white" }}
                    >
                      View File
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <>
          <Button
            variant="subtle"
            leftIcon={<CaretLeft size={12} />}
            onClick={handleBackToList}
            style={{ marginBottom: "10px" }}
          >
            Back to List
          </Button>
          <ViewRequestFile
            request={selectedRequest}
            setActiveTab={setActiveTab}
          />
        </>
      )}
    </Container>
  );
}
CreatedRequests.propTypes = {
  setActiveTab: PropTypes.func,
};

export default CreatedRequests;
