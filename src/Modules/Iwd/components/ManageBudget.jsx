import React, { useState, useEffect } from "react";
import { Container, Table, Button, Title, Grid, Loader } from "@mantine/core";
import axios from "axios";
import EditBudget from "./EditBudgetForm";
import { IWD_ROUTES } from "../routes/iwdRoutes";

function ManageBudget() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const handleBackToList = () => {
    setSelectedBudget(null);
    setOperation(null);
  };

  const [loading, setLoading] = useState(false);

  const [budgetList, setbudgetList] = useState([]);
  useEffect(() => {
    const getBudgets = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(IWD_ROUTES.VIEW_BUDGET, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setbudgetList(response.data.obj);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getBudgets();
  }, [operation]);

  return (
    <Container style={{ padding: "10px" }}>
      <br />
      {loading ? (
        <Grid mt="xl">
          <Container py="xl">
            <Loader size="lg" />
          </Container>
        </Grid>
      ) : !operation ? (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            borderLeft: "10px solid #1E90FF",
          }}
        >
          <Title align="center" mb="md" style={{ fontSize: "26px !important" }}>
            Manage Budgets
          </Title>
          <Table highlightOnHover withBorder withColumnBorders>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Budget Issued</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {budgetList.map((budget) => (
                <tr key={budget.id}>
                  <td>{budget.id}</td>
                  <td>{budget.name}</td>
                  <td>{budget.budgetIssued}</td>
                  <td>
                    <Button
                      size="xs"
                      onClick={() => {
                        handleBudgetSelect(budget);
                        setOperation("edit");
                      }}
                      style={{
                        backgroundColor: "#1E90FF",
                        color: "white",
                        borderRadius: "20px",
                        padding: "10px 20px",
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            style={{
              backgroundColor: "#1E90FF",
              color: "white",
              borderRadius: "20px",
              marginTop: "10px",
            }}
            onClick={() => {
              setOperation("add");
            }}
          >
            Add Budget
          </Button>
        </div>
      ) : (
        <EditBudget
          selectedBudget={selectedBudget}
          onBack={handleBackToList}
          checkOperation={operation}
        />
      )}
    </Container>
  );
}

export default ManageBudget;
