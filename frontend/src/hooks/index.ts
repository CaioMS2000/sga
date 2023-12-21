import { DebugContext } from "@/context/debugContext";
import { useContext, useEffect, useState } from "react";

export const useDebug = () => {
	return useContext(DebugContext);
};
