import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBar from "../components/search-bar/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

test("it shows an autocomplete", () => {
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  const input = screen.getAllByRole("combobox");

  expect(input).toHaveLength(1);
});
