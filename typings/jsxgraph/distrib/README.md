Temporary version of the typings for JSXraph until some bugs fixed:
```
typings/jsxgraph/distrib/index.d.ts:236:27 - error TS7019: Rest parameter 'unknown' implicitly has an 'any[]' type.

236     export function debug(...unknown): void;
                              ~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:237:30 - error TS7019: Rest parameter 'unknown' implicitly has an 'any[]' type.

237     export function debugInt(...unknown): void;
                                 ~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:238:31 - error TS7019: Rest parameter 'unknown' implicitly has an 'any[]' type.

238     export function debugLine(...unknown): void;
                                  ~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:239:30 - error TS7019: Rest parameter 'unknown' implicitly has an 'any[]' type.

239     export function debugWST(...unknown): void;
                                 ~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:242:46 - error TS7006: Parameter 'replacement' implicitly has an 'any' type.

242     export function deprecated(what: string, replacement): void;
                                                 ~~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:311:21 - error TS7010: 'supportsSVG', which lacks return-type annotation, implicitly has an 'any' return type.

311     export function supportsSVG();
                        ~~~~~~~~~~~

typings/jsxgraph/distrib/index.d.ts:312:21 - error TS7010: 'supportsVML', which lacks return-type annotation, implicitly has an 'any' return type.

312     export function supportsVML();
                        ~~~~~~~~~~~


Found 7 errors.

```