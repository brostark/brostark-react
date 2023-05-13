var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
export const useCollection = (model, options = {}) => {
    const [result, setResult] = useState(null);
    const { setIsLoading } = useContext(AppContext);
    const getNextItems = useCallback((previousResult) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        const getAllResult = yield model.getItems(Object.assign(Object.assign({}, options), { startAfter: previousResult ? previousResult.startAfter : "" }));
        const nextItems = Array.isArray(previousResult === null || previousResult === void 0 ? void 0 : previousResult.items) ? previousResult.items.concat(getAllResult.items) : getAllResult.items;
        setResult(Object.assign(Object.assign({}, getAllResult), { items: nextItems }));
        setIsLoading(false);
    }), [setIsLoading, model, options]);
    const next = () => __awaiter(void 0, void 0, void 0, function* () { return getNextItems(result); });
    const refresh = () => __awaiter(void 0, void 0, void 0, function* () { return getNextItems(null); });
    return {
        next,
        refresh,
        items: result ? result.items : [],
        hasMore: result ? result.hasMore : false,
        startAfter: result ? result.startAfter : "",
    };
};
