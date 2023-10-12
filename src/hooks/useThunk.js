import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunkFn) => {
  const [state, setState] = useState({ isLoading: false, error: null });
  const dispatch = useDispatch();

  const runThunk = useCallback(() => {
    setState((st) => ({ ...st, isLoading: true }));

    dispatch(thunkFn())
      .unwrap()
      .catch((err) => setState((st) => ({ ...st, error: err })))
      .finally(() => setState((st) => ({ ...st, isLoading: false })));
  }, [dispatch, thunkFn]);

  const { isLoading, error } = state;
  
  return [runThunk, isLoading, error];
};
