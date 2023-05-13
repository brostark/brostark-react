var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appContext";
export const useDocument = (model, id = "") => {
    const { setIsLoading } = useContext(AppContext);
    const [item, setItem] = useState(null);
    const refresh = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        const nextItem = yield model.getItem(id);
        setItem(nextItem);
        setIsLoading(false);
    }), [model, id, setItem, setIsLoading]);
    useEffect(() => {
        if (id && !["add", "create"].includes(id)) {
            refresh();
        }
    }, [refresh, id]);
    return {
        item,
        refresh,
    };
};
