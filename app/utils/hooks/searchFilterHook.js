import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveNotes } from "../../redux/noteSlice";
import NoteServices from "../../services/NoteServices";

export default function searchFilterHook() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState(
    notes || []
  );

  const [refreshing, setRefreshing] = useState(false);

  console.log("notes", notes);
  console.log("masterDataSource", masterDataSource);
  console.log("filteredDataSource", filteredDataSource);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(retrieveNotes());
  }, [refreshing]);

  useEffect(() => {
    setFilteredDataSource(notes);
    setMasterDataSource(notes);
  }, [notes]);

  useEffect(() => {
    onRefresh();
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = notes.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return [
    refreshing,
    search,
    onRefresh,
    searchFilterFunction,
    filteredDataSource,
  ];
}
