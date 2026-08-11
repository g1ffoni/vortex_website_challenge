module.exports = [
"[project]/src/components/sections/categories/Categories.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "Categories-module__8vUNEq__card",
  "emoji": "Categories-module__8vUNEq__emoji",
  "grid": "Categories-module__8vUNEq__grid",
  "header": "Categories-module__8vUNEq__header",
  "name": "Categories-module__8vUNEq__name",
  "section": "Categories-module__8vUNEq__section",
  "subtitle": "Categories-module__8vUNEq__subtitle",
  "thumbnail": "Categories-module__8vUNEq__thumbnail",
  "title": "Categories-module__8vUNEq__title",
});
}),
"[project]/src/components/sections/categories/Categories.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Categories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/categories/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$api$2f$use$2d$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/categories/api/use-categories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sections/categories/Categories.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
function Categories() {
    const { data: categories = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$api$2f$use$2d$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCategories"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
        id: "categories",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                children: "Browse by category"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                                children: "From freshman year to your final project: find what you need by area."
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/categories/Categories.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                    children: isLoading && categories.length === 0 ? Array.from({
                        length: 6
                    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emoji,
                                    children: "⏳"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                    lineNumber: 27,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].name,
                                    children: "Loading…"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                    lineNumber: 28,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/components/sections/categories/Categories.tsx",
                            lineNumber: 26,
                            columnNumber: 17
                        }, this)) : categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/listings?category=${category.slug}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                            children: [
                                category.imageUrl ? // eslint-disable-next-line @next/next/no-img-element -- arbitrary category image URLs, not a configured remote host
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: category.imageUrl,
                                    alt: "",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnail
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                    lineNumber: 39,
                                    columnNumber: 21
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emoji,
                                    "aria-hidden": "true",
                                    children: "🏷️"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                    lineNumber: 41,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$categories$2f$Categories$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].name,
                                    children: category.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                                    lineNumber: 45,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, category.id, true, {
                            fileName: "[project]/src/components/sections/categories/Categories.tsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/categories/Categories.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/categories/Categories.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/categories/Categories.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/sections/hero/Hero.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "Hero-module__59nn_G__actions",
  "description": "Hero-module__59nn_G__description",
  "hero": "Hero-module__59nn_G__hero",
  "highlight": "Hero-module__59nn_G__highlight",
  "searchBar": "Hero-module__59nn_G__searchBar",
  "searchButton": "Hero-module__59nn_G__searchButton",
  "searchIcon": "Hero-module__59nn_G__searchIcon",
  "searchInput": "Hero-module__59nn_G__searchInput",
  "title": "Hero-module__59nn_G__title",
});
}),
"[project]/src/components/sections/hero/Hero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2f$LinkButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button/LinkButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sections/hero/Hero.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
function Hero() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    function handleSearch(event) {
        event.preventDefault();
        const trimmed = query.trim();
        router.push(trimmed ? `/listings?q=${encodeURIComponent(trimmed)}` : "/listings");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hero,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                    children: [
                        "Give what you don't use anymore a new home —",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].highlight,
                            children: "straight to another student"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hero/Hero.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/hero/Hero.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                    children: "UniforTrade connects students finishing a course with students just starting it. List books, calculators, lab coats and other items to sell or donate right within your own university — no shipping, no hassle."
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hero/Hero.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchBar,
                    onSubmit: handleSearch,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchIcon,
                            "aria-hidden": "true",
                            children: "🔍"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hero/Hero.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "search",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchInput,
                            placeholder: "Search for books, calculators, lab coats…",
                            "aria-label": "Search listings",
                            value: query,
                            onChange: (event)=>setQuery(event.target.value)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hero/Hero.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchButton,
                            children: "Search"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hero/Hero.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/hero/Hero.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$hero$2f$Hero$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actions,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2f$LinkButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/listings/new",
                        size: "md",
                        children: "List an item"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hero/Hero.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hero/Hero.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/hero/Hero.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hero/Hero.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/sections/showcase/Showcase.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "filterButton": "Showcase-module__BMHoYG__filterButton",
  "filterButtonActive": "Showcase-module__BMHoYG__filterButtonActive",
  "filters": "Showcase-module__BMHoYG__filters",
  "footer": "Showcase-module__BMHoYG__footer",
  "grid": "Showcase-module__BMHoYG__grid",
  "header": "Showcase-module__BMHoYG__header",
  "pulse": "Showcase-module__BMHoYG__pulse",
  "section": "Showcase-module__BMHoYG__section",
  "skeleton": "Showcase-module__BMHoYG__skeleton",
  "subtitle": "Showcase-module__BMHoYG__subtitle",
  "title": "Showcase-module__BMHoYG__title",
});
}),
"[project]/src/components/sections/showcase/Showcase.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Showcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/categories/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$api$2f$use$2d$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/categories/api/use-categories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/listings/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$listings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-listings.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2f$LinkButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button/LinkButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/item-card/ItemCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/empty-state/EmptyState.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sections/showcase/Showcase.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
;
;
function Showcase() {
    const [categoryId, setCategoryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const { data: categories = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$api$2f$use$2d$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCategories"])();
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$listings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useListings"])({
        size: 8,
        sort: [
            "createdAt,desc"
        ],
        status: "ACTIVE",
        categoryId
    });
    const listings = data?.content ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
        id: "listings",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                children: "Latest listings"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                                children: "Fresh finds from other Unifor students."
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filters,
                    role: "group",
                    "aria-label": "Filter by category",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterButton} ${categoryId === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterButtonActive : ""}`,
                            onClick: ()=>setCategoryId(undefined),
                            children: "All"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterButton} ${categoryId === category.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterButtonActive : ""}`,
                                onClick: ()=>setCategoryId(category.id),
                                children: category.name
                            }, category.id, false, {
                                fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                    "aria-hidden": "true",
                    children: Array.from({
                        length: 8
                    }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton
                        }, index, false, {
                            fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                            lineNumber: 57,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this) : listings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: "🔍",
                    title: "Nothing here yet",
                    description: "Be the first to list something in this category.",
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2f$LinkButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/listings/new",
                        children: "List an item"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                    children: listings.map((listing)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            listing: listing
                        }, listing.id, false, {
                            fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$showcase$2f$Showcase$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].footer,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2f$LinkButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/listings",
                        variant: "secondary",
                        children: "View all listings"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/showcase/Showcase.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/sections/stats/Stats.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "grid": "Stats-module__nVk2SW__grid",
  "label": "Stats-module__nVk2SW__label",
  "section": "Stats-module__nVk2SW__section",
  "tile": "Stats-module__nVk2SW__tile",
  "value": "Stats-module__nVk2SW__value",
});
}),
"[project]/src/components/sections/stats/Stats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Stats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$stats$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/stats/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$stats$2f$api$2f$use$2d$stats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/stats/api/use-stats.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/container/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/sections/stats/Stats.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const numberFormatter = new Intl.NumberFormat("en-US");
function formatStat(value) {
    return numberFormatter.format(value ?? 0);
}
function Stats() {
    const { data: stats, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$stats$2f$api$2f$use$2d$stats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStats"])();
    const tiles = [
        {
            label: "Registered students",
            value: stats?.registeredUsersCount
        },
        {
            label: "Items rehomed",
            value: stats?.completedClaimsCount
        },
        {
            label: "Sales completed",
            value: stats?.completedSaleClaimsCount
        },
        {
            label: "Donations made",
            value: stats?.completedDonationClaimsCount
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].section,
        "aria-label": "Platform statistics",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$container$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                children: tiles.map((tile)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tile,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].value,
                                children: isLoading ? "—" : formatStat(tile.value)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/stats/Stats.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sections$2f$stats$2f$Stats$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                children: tile.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/stats/Stats.tsx",
                                lineNumber: 30,
                                columnNumber: 15
                            }, this)
                        ]
                    }, tile.label, true, {
                        fileName: "[project]/src/components/sections/stats/Stats.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/stats/Stats.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/sections/stats/Stats.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/stats/Stats.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/badge/Badge.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accent": "Badge-module__h3Qzbq__accent",
  "badge": "Badge-module__h3Qzbq__badge",
  "danger": "Badge-module__h3Qzbq__danger",
  "information": "Badge-module__h3Qzbq__information",
  "neutral": "Badge-module__h3Qzbq__neutral",
  "success": "Badge-module__h3Qzbq__success",
  "warning": "Badge-module__h3Qzbq__warning",
});
}),
"[project]/src/components/ui/badge/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge/Badge.module.css [app-ssr] (css module)");
;
;
function Badge({ tone = "neutral", children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].badge,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][tone],
            className
        ].filter(Boolean).join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge/Badge.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/badge/ListingBadges.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListingStatusBadge",
    ()=>ListingStatusBadge,
    "ListingTypeBadge",
    ()=>ListingTypeBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge/Badge.tsx [app-ssr] (ecmascript)");
;
;
const STATUS_LABEL = {
    ACTIVE: "Available",
    CLAIMED: "Reserved",
    COMPLETED: "Completed"
};
const STATUS_TONE = {
    ACTIVE: "success",
    CLAIMED: "warning",
    COMPLETED: "neutral"
};
function ListingStatusBadge({ status }) {
    if (!status) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        tone: STATUS_TONE[status],
        children: STATUS_LABEL[status]
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge/ListingBadges.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
const TYPE_LABEL = {
    SALE: "For sale",
    DONATION: "Donation"
};
const TYPE_TONE = {
    SALE: "information",
    DONATION: "accent"
};
function ListingTypeBadge({ type }) {
    if (!type) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        tone: TYPE_TONE[type],
        children: TYPE_LABEL[type]
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge/ListingBadges.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/components/ui/empty-state/EmptyState.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "description": "EmptyState-module__OkL_wa__description",
  "emptyState": "EmptyState-module__OkL_wa__emptyState",
  "icon": "EmptyState-module__OkL_wa__icon",
  "title": "EmptyState-module__OkL_wa__title",
});
}),
"[project]/src/components/ui/empty-state/EmptyState.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/empty-state/EmptyState.module.css [app-ssr] (css module)");
;
;
function EmptyState({ icon = "📦", title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                "aria-hidden": "true",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/components/ui/empty-state/EmptyState.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/empty-state/EmptyState.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2f$EmptyState$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/ui/empty-state/EmptyState.tsx",
                lineNumber: 18,
                columnNumber: 23
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/empty-state/EmptyState.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/item-card/ItemCard.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "body": "ItemCard-module__DoTw9W__body",
  "card": "ItemCard-module__DoTw9W__card",
  "category": "ItemCard-module__DoTw9W__category",
  "donation": "ItemCard-module__DoTw9W__donation",
  "price": "ItemCard-module__DoTw9W__price",
  "statusBadge": "ItemCard-module__DoTw9W__statusBadge",
  "thumbnail": "ItemCard-module__DoTw9W__thumbnail",
  "thumbnailFallback": "ItemCard-module__DoTw9W__thumbnailFallback",
  "thumbnailWrapper": "ItemCard-module__DoTw9W__thumbnailWrapper",
  "title": "ItemCard-module__DoTw9W__title",
});
}),
"[project]/src/components/ui/item-card/ItemCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ItemCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$ListingBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge/ListingBadges.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/item-card/ItemCard.module.css [app-ssr] (css module)");
;
;
;
;
;
function ItemCard({ listing }) {
    const isDonation = !listing.price || listing.price === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: `/listings/${listing.id}`,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnailWrapper,
                children: [
                    listing.thumbnailUrl ? // eslint-disable-next-line @next/next/no-img-element -- gallery URLs are arbitrary, unconfigured remote hosts (simulated image URLs per the challenge spec)
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: listing.thumbnailUrl,
                        alt: "",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnail,
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnailFallback,
                        "aria-hidden": "true",
                        children: "📦"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadge,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2f$ListingBadges$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListingStatusBadge"], {
                            status: listing.status
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].body,
                children: [
                    listing.categoryName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].category,
                        children: listing.categoryName
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 30,
                        columnNumber: 34
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                        children: listing.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].price,
                            isDonation && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$item$2d$card$2f$ItemCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].donation
                        ].filter(Boolean).join(" "),
                        children: isDonation ? "Donation" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatPrice"])(listing.price)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/item-card/ItemCard.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/categories/api/use-categories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCategories",
    ()=>useCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$category$2d$controller$2f$category$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/category-controller/category-controller.ts [app-ssr] (ecmascript)");
;
function useCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$category$2d$controller$2f$category$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFindAllByOrderByNameAsc"])();
}
}),
"[project]/src/features/categories/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$categories$2f$api$2f$use$2d$categories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/categories/api/use-categories.ts [app-ssr] (ecmascript)");
;
}),
"[project]/src/features/listings/api/use-cancel-claim.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCancelListingClaim",
    ()=>useCancelListingClaim
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useCancelListingClaim(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCancelClaim"])(id);
}
}),
"[project]/src/features/listings/api/use-claim-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useClaimListing",
    ()=>useClaimListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useClaimListing(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClaim"])(id);
}
}),
"[project]/src/features/listings/api/use-complete-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCompleteListing",
    ()=>useCompleteListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useCompleteListing(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useComplete"])(id);
}
}),
"[project]/src/features/listings/api/use-create-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateListing",
    ()=>useCreateListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useCreateListing() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCreate2"])();
}
}),
"[project]/src/features/listings/api/use-delete-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeleteListing",
    ()=>useDeleteListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useDeleteListing(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDelete1"])(id);
}
}),
"[project]/src/features/listings/api/use-listing-contact.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useListingContact",
    ()=>useListingContact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useListingContact(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetContact"])(id, {
        swr: {
            enabled: id !== undefined
        }
    });
}
}),
"[project]/src/features/listings/api/use-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useListing",
    ()=>useListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useListing(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFindById1"])(id, {
        swr: {
            enabled: id !== undefined
        }
    });
}
}),
"[project]/src/features/listings/api/use-listings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useListings",
    ()=>useListings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/use-swr-mgpzvfmo.mjs [app-ssr] (ecmascript) <export u as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/mutator.ts [app-ssr] (ecmascript)");
;
;
function searchListings(filters) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: "/api/listings",
        method: "GET",
        params: filters
    });
}
const DEFAULT_FILTERS = {
    size: 24,
    sort: [
        "createdAt,desc"
    ]
};
function useListings(filters = DEFAULT_FILTERS) {
    const key = [
        "/api/listings",
        filters
    ];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(key, ()=>searchListings(filters));
}
}),
"[project]/src/features/listings/api/use-update-listing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpdateListing",
    ()=>useUpdateListing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)");
;
function useUpdateListing(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$listing$2d$controller$2f$listing$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePatch1"])(id);
}
}),
"[project]/src/features/listings/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$listings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-listings.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$create$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-create-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$update$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-update-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$delete$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-delete-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$claim$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-claim-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$cancel$2d$claim$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-cancel-claim.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$complete$2d$listing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-complete-listing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$listings$2f$api$2f$use$2d$listing$2d$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/listings/api/use-listing-contact.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/src/features/stats/api/use-stats.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStats",
    ()=>useStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$stats$2d$controller$2f$stats$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/generated/stats-controller/stats-controller.ts [app-ssr] (ecmascript)");
;
function useStats() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$generated$2f$stats$2d$controller$2f$stats$2d$controller$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetStats"])();
}
}),
"[project]/src/features/stats/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$stats$2f$api$2f$use$2d$stats$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/stats/api/use-stats.ts [app-ssr] (ecmascript)");
;
}),
"[project]/src/lib/api/generated/category-controller/category-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create3",
    ()=>create3,
    "delete2",
    ()=>delete2,
    "findAllByOrderByNameAsc",
    ()=>findAllByOrderByNameAsc,
    "findById2",
    ()=>findById2,
    "getCreate3MutationFetcher",
    ()=>getCreate3MutationFetcher,
    "getCreate3MutationKey",
    ()=>getCreate3MutationKey,
    "getDelete2MutationFetcher",
    ()=>getDelete2MutationFetcher,
    "getDelete2MutationKey",
    ()=>getDelete2MutationKey,
    "getFindAllByOrderByNameAscKey",
    ()=>getFindAllByOrderByNameAscKey,
    "getFindById2Key",
    ()=>getFindById2Key,
    "useCreate3",
    ()=>useCreate3,
    "useDelete2",
    ()=>useDelete2,
    "useFindAllByOrderByNameAsc",
    ()=>useFindAllByOrderByNameAsc,
    "useFindById2",
    ()=>useFindById2
]);
/**
 * Generated by orval v8.23.0 🍺
 * Do not edit manually.
 * UniforTrade API
 * Marketplace de economia circular do campus — estudantes anunciam itens (livros, calculadoras, componentes eletrônicos, jalecos, móveis etc.) para venda ou doação a outros estudantes.
 *
 * Fluxo de uma transação: uma listing ACTIVE é reivindicada (`POST /{id}/claim`, vira CLAIMED), as duas partes trocam contato (`GET /{id}/contact`) para combinar local e horário, e o vendedor confirma a entrega presencial (`POST /{id}/complete`). Qualquer uma das partes pode desistir antes da entrega (`DELETE /{id}/claim`), o que devolve a listing para ACTIVE.
 *
 * A maioria dos endpoints de leitura é pública; escrita e ações de fluxo exigem um usuário autenticado, e endpoints de categoria (além de GET) exigem a role ADMIN.
 *
 * Autenticação: o cadastro é `POST /api/users`, que cria a conta e retorna o perfil, mas não devolve tokens. Faça login em `POST /auth/login` para receber o par `accessToken` / `refreshToken`, renove em `POST /auth/refresh` e encerre a sessão no cliente com `POST /auth/logout`. Use o `accessToken` no botão "Authorize" acima para enviá-lo como `Authorization: Bearer <token>`.
 *
 * OpenAPI spec version: 0.0.1
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/use-swr-mgpzvfmo.mjs [app-ssr] (ecmascript) <export u as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/mutation/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/mutator.ts [app-ssr] (ecmascript)");
;
;
;
const findAllByOrderByNameAsc = (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/categories`,
        method: 'GET'
    }, options);
};
const getFindAllByOrderByNameAscKey = ()=>[
        `/api/categories`
    ];
const useFindAllByOrderByNameAsc = (options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getFindAllByOrderByNameAscKey() : null);
    const swrFn = ()=>findAllByOrderByNameAsc(requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const create3 = (createCategoryRequest, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/categories`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: createCategoryRequest
    }, options);
};
const getCreate3MutationFetcher = (options)=>{
    return (_, { arg })=>{
        return create3(arg, options);
    };
};
const getCreate3MutationKey = ()=>[
        `/api/categories`
    ];
const useCreate3 = (options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getCreate3MutationKey();
    const swrFn = getCreate3MutationFetcher(requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const findById2 = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/categories/${id}`,
        method: 'GET'
    }, options);
};
const getFindById2Key = (id)=>[
        `/api/categories/${id}`
    ];
const useFindById2 = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false && id !== null && id !== undefined;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getFindById2Key(id) : null);
    const swrFn = ()=>findById2(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const delete2 = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/categories/${id}`,
        method: 'DELETE'
    }, options);
};
const getDelete2MutationFetcher = (id, options)=>{
    return (_, __)=>{
        return delete2(id, options);
    };
};
const getDelete2MutationKey = (id)=>[
        `/api/categories/${id}`
    ];
const useDelete2 = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getDelete2MutationKey(id);
    const swrFn = getDelete2MutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
}),
"[project]/src/lib/api/generated/listing-controller/listing-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelClaim",
    ()=>cancelClaim,
    "claim",
    ()=>claim,
    "complete",
    ()=>complete,
    "create2",
    ()=>create2,
    "delete1",
    ()=>delete1,
    "findById1",
    ()=>findById1,
    "getCancelClaimMutationFetcher",
    ()=>getCancelClaimMutationFetcher,
    "getCancelClaimMutationKey",
    ()=>getCancelClaimMutationKey,
    "getClaimMutationFetcher",
    ()=>getClaimMutationFetcher,
    "getClaimMutationKey",
    ()=>getClaimMutationKey,
    "getCompleteMutationFetcher",
    ()=>getCompleteMutationFetcher,
    "getCompleteMutationKey",
    ()=>getCompleteMutationKey,
    "getContact",
    ()=>getContact,
    "getCreate2MutationFetcher",
    ()=>getCreate2MutationFetcher,
    "getCreate2MutationKey",
    ()=>getCreate2MutationKey,
    "getDelete1MutationFetcher",
    ()=>getDelete1MutationFetcher,
    "getDelete1MutationKey",
    ()=>getDelete1MutationKey,
    "getFindById1Key",
    ()=>getFindById1Key,
    "getGetContactKey",
    ()=>getGetContactKey,
    "getPatch1MutationFetcher",
    ()=>getPatch1MutationFetcher,
    "getPatch1MutationKey",
    ()=>getPatch1MutationKey,
    "getSearchKey",
    ()=>getSearchKey,
    "patch1",
    ()=>patch1,
    "search",
    ()=>search,
    "useCancelClaim",
    ()=>useCancelClaim,
    "useClaim",
    ()=>useClaim,
    "useComplete",
    ()=>useComplete,
    "useCreate2",
    ()=>useCreate2,
    "useDelete1",
    ()=>useDelete1,
    "useFindById1",
    ()=>useFindById1,
    "useGetContact",
    ()=>useGetContact,
    "usePatch1",
    ()=>usePatch1,
    "useSearch",
    ()=>useSearch
]);
/**
 * Generated by orval v8.23.0 🍺
 * Do not edit manually.
 * UniforTrade API
 * Marketplace de economia circular do campus — estudantes anunciam itens (livros, calculadoras, componentes eletrônicos, jalecos, móveis etc.) para venda ou doação a outros estudantes.
 *
 * Fluxo de uma transação: uma listing ACTIVE é reivindicada (`POST /{id}/claim`, vira CLAIMED), as duas partes trocam contato (`GET /{id}/contact`) para combinar local e horário, e o vendedor confirma a entrega presencial (`POST /{id}/complete`). Qualquer uma das partes pode desistir antes da entrega (`DELETE /{id}/claim`), o que devolve a listing para ACTIVE.
 *
 * A maioria dos endpoints de leitura é pública; escrita e ações de fluxo exigem um usuário autenticado, e endpoints de categoria (além de GET) exigem a role ADMIN.
 *
 * Autenticação: o cadastro é `POST /api/users`, que cria a conta e retorna o perfil, mas não devolve tokens. Faça login em `POST /auth/login` para receber o par `accessToken` / `refreshToken`, renove em `POST /auth/refresh` e encerre a sessão no cliente com `POST /auth/logout`. Use o `accessToken` no botão "Authorize" acima para enviá-lo como `Authorization: Bearer <token>`.
 *
 * OpenAPI spec version: 0.0.1
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/use-swr-mgpzvfmo.mjs [app-ssr] (ecmascript) <export u as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/mutation/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/mutator.ts [app-ssr] (ecmascript)");
;
;
;
const search = (params, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings`,
        method: 'GET',
        params
    }, options);
};
const getSearchKey = (params)=>[
        `/api/listings`,
        ...params ? [
            params
        ] : []
    ];
const useSearch = (params, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getSearchKey(params) : null);
    const swrFn = ()=>search(params, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const create2 = (createListingRequest, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: createListingRequest
    }, options);
};
const getCreate2MutationFetcher = (options)=>{
    return (_, { arg })=>{
        return create2(arg, options);
    };
};
const getCreate2MutationKey = ()=>[
        `/api/listings`
    ];
const useCreate2 = (options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getCreate2MutationKey();
    const swrFn = getCreate2MutationFetcher(requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const complete = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}/complete`,
        method: 'POST'
    }, options);
};
const getCompleteMutationFetcher = (id, options)=>{
    return (_, __)=>{
        return complete(id, options);
    };
};
const getCompleteMutationKey = (id)=>[
        `/api/listings/${id}/complete`
    ];
const useComplete = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getCompleteMutationKey(id);
    const swrFn = getCompleteMutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const claim = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}/claim`,
        method: 'POST'
    }, options);
};
const getClaimMutationFetcher = (id, options)=>{
    return (_, __)=>{
        return claim(id, options);
    };
};
const getClaimMutationKey = (id)=>[
        `/api/listings/${id}/claim`
    ];
const useClaim = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getClaimMutationKey(id);
    const swrFn = getClaimMutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const cancelClaim = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}/claim`,
        method: 'DELETE'
    }, options);
};
const getCancelClaimMutationFetcher = (id, options)=>{
    return (_, __)=>{
        return cancelClaim(id, options);
    };
};
const getCancelClaimMutationKey = (id)=>[
        `/api/listings/${id}/claim`
    ];
const useCancelClaim = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getCancelClaimMutationKey(id);
    const swrFn = getCancelClaimMutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const findById1 = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}`,
        method: 'GET'
    }, options);
};
const getFindById1Key = (id)=>[
        `/api/listings/${id}`
    ];
const useFindById1 = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false && id !== null && id !== undefined;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getFindById1Key(id) : null);
    const swrFn = ()=>findById1(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const delete1 = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}`,
        method: 'DELETE'
    }, options);
};
const getDelete1MutationFetcher = (id, options)=>{
    return (_, __)=>{
        return delete1(id, options);
    };
};
const getDelete1MutationKey = (id)=>[
        `/api/listings/${id}`
    ];
const useDelete1 = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getDelete1MutationKey(id);
    const swrFn = getDelete1MutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const patch1 = (id, patchListingRequest, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}`,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        data: patchListingRequest
    }, options);
};
const getPatch1MutationFetcher = (id, options)=>{
    return (_, { arg })=>{
        return patch1(id, arg, options);
    };
};
const getPatch1MutationKey = (id)=>[
        `/api/listings/${id}`
    ];
const usePatch1 = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const swrKey = swrOptions?.swrKey ?? getPatch1MutationKey(id);
    const swrFn = getPatch1MutationFetcher(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
const getContact = (id, options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/listings/${id}/contact`,
        method: 'GET'
    }, options);
};
const getGetContactKey = (id)=>[
        `/api/listings/${id}/contact`
    ];
const useGetContact = (id, options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false && id !== null && id !== undefined;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getGetContactKey(id) : null);
    const swrFn = ()=>getContact(id, requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
}),
"[project]/src/lib/api/generated/stats-controller/stats-controller.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGetStatsKey",
    ()=>getGetStatsKey,
    "getStats",
    ()=>getStats,
    "useGetStats",
    ()=>useGetStats
]);
/**
 * Generated by orval v8.23.0 🍺
 * Do not edit manually.
 * UniforTrade API
 * Marketplace de economia circular do campus — estudantes anunciam itens (livros, calculadoras, componentes eletrônicos, jalecos, móveis etc.) para venda ou doação a outros estudantes.
 *
 * Fluxo de uma transação: uma listing ACTIVE é reivindicada (`POST /{id}/claim`, vira CLAIMED), as duas partes trocam contato (`GET /{id}/contact`) para combinar local e horário, e o vendedor confirma a entrega presencial (`POST /{id}/complete`). Qualquer uma das partes pode desistir antes da entrega (`DELETE /{id}/claim`), o que devolve a listing para ACTIVE.
 *
 * A maioria dos endpoints de leitura é pública; escrita e ações de fluxo exigem um usuário autenticado, e endpoints de categoria (além de GET) exigem a role ADMIN.
 *
 * Autenticação: o cadastro é `POST /api/users`, que cria a conta e retorna o perfil, mas não devolve tokens. Faça login em `POST /auth/login` para receber o par `accessToken` / `refreshToken`, renove em `POST /auth/refresh` e encerre a sessão no cliente com `POST /auth/logout`. Use o `accessToken` no botão "Authorize" acima para enviá-lo como `Authorization: Bearer <token>`.
 *
 * OpenAPI spec version: 0.0.1
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/use-swr-mgpzvfmo.mjs [app-ssr] (ecmascript) <export u as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/mutator.ts [app-ssr] (ecmascript)");
;
;
const getStats = (options)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$mutator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])({
        url: `/api/stats`,
        method: 'GET'
    }, options);
};
const getGetStatsKey = ()=>[
        `/api/stats`
    ];
const useGetStats = (options)=>{
    const { swr: swrOptions, request: requestOptions } = options ?? {};
    const isEnabled = swrOptions?.enabled !== false;
    const swrKey = swrOptions?.swrKey ?? (()=>isEnabled ? getGetStatsKey() : null);
    const swrFn = ()=>getStats(requestOptions);
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$mgpzvfmo$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(swrKey, swrFn, swrOptions);
    return {
        swrKey,
        ...query
    };
};
}),
];

//# sourceMappingURL=src_04n1e41._.js.map