import { useCallback, useContext, useState } from "react";

import { AppContext } from "../contexts/appContext";
import { FirestoreModel } from "../lib/firestoreModel";
import { GetAllOptions, GetAllResult } from "../lib/firestoreService";
import { FirestoreDocument } from "../lib";


export const useCollection = <T extends FirestoreDocument>(model: FirestoreModel<T, unknown>, options: GetAllOptions = {}) => {
  const [result, setResult] = useState<GetAllResult | null>(null);

  const { setIsLoading } = useContext(AppContext);

  const getNextItems = useCallback(async (previousResult: GetAllResult | null) => {
    setIsLoading(true);

    const getAllResult: GetAllResult = await model.getItems({
      ...options,
      startAfter: previousResult ? previousResult.startAfter : "",
    });

    const nextItems = Array.isArray(previousResult?.items) ? previousResult!.items.concat(getAllResult.items) : getAllResult.items;

    setResult({
      ...getAllResult,
      items: nextItems,
    });

    setIsLoading(false); 
  }, [setIsLoading, model, options]);

  const next = async () => getNextItems(result);
  const refresh = async () => getNextItems(null);

  return {
    next,
    refresh,
    items: result ? result.items as T[] : [],
    hasMore: result ? result.hasMore : false,
    startAfter: result ? result.startAfter : "",
  }
}
