import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { FirestoreModel } from "../lib/firestoreModel";
import { FirestoreDocument } from "../lib";

export const useDocument = <T extends FirestoreDocument>(model: FirestoreModel<T>, id: string = "") => {
  const { setIsLoading } = useContext(AppContext);
  const [item, setItem] = useState<T | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);

    const nextItem = await model.getItem(id);

    setItem(nextItem);
    setIsLoading(false);
  }, [model, id, setItem, setIsLoading]);

  useEffect(() => {
    if (id && !["add", "create"].includes(id)) {
      refresh();
    }
  }, [refresh, id]);

  return {
    item,
    refresh,
  }
}
