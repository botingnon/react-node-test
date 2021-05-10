import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, InputGroup, Button } from "react-bootstrap";

import { activeSearch, setSearch } from "../../store/reducers/App";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector(activeSearch);

  /**
   * Handle the input click and changes search state
   * @function handleChangeSearch
   * @returns {Function} On click event handler
   */
  const handleChangeSearch = ({ target }) => dispatch(setSearch(target.value));

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        name="search"
        value={search}
        onChange={handleChangeSearch}
        placeholder="search farm name or culture"
      />
      <InputGroup.Append>
        <Button
          variant="outline-danger"
          onClick={() => dispatch(setSearch(""))}
          disabled={search.length === 0}
        >
          X
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
