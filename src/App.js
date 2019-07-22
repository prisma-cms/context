import {
  createContext,
} from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

import URI from "urijs";

export default createContext({}, function (prevContext, context) {

  let changes = [];

  /**
   * Сначала проверяем нативными средствами на идентичность свойств первого уровня.
   */
  if (context && !shallowEqual(prevContext, context)) {
    // if (context) {

    /**
     * Если есть несоответствия, то проходимся по элементам первого уровня
     * и проверяем свои собственные известные свойства
     */

    Object.keys(context).map(key => {

      const value = context[key];
      const prevValue = prevContext[key];

      if (value !== undefined && value !== prevValue) {

        // console.log("@prisma-cms/context changed", key, prevValue, value);

        switch (key) {

          // case "router":

          //   if (value && (!prevValue || prevValue.history.location.pathname !== value.history.location.pathname)) {

          //     // console.log("temp3.history.location", value.history.location
          //     //   , prevValue.history.location.pathname
          //     //   , value.history.location.pathname
          //     // );

          //     changes.push({
          //       key,
          //       value,
          //       prevValue,
          //     });

          //   }

          //   break;

          // case "uri":

          //   if (value instanceof URI) {

          //     if (!prevValue || !(prevValue instanceof URI) || prevValue.resource() !== value.resource()) {

          //       changes.push({
          //         key,
          //         value,
          //         prevValue,
          //       });

          //     }

          //   }
          //   else {
          //     changes.push({
          //       key,
          //       value,
          //       prevValue,
          //     });
          //   }

          //   break;

          case "query":


            if (!shallowEqual(value, prevValue)) {

              if (process.env.NODE_ENV === "development") {

                console.error("@prisma-cms/context changed query !shallowEqual", prevValue, value);

              }

              if (JSON.stringify(value) !== JSON.stringify(prevValue)) {

                if (process.env.NODE_ENV === "development") {

                  console.error("@prisma-cms/context changed query !JSON.stringify Equal",
                    JSON.stringify(prevValue, true, 2),
                    JSON.stringify(value, true, 2)
                  );

                }

                changes.push({
                  key,
                  value,
                  prevValue,
                });
              }

            }


            break;

          default: changes.push({
            key,
            value,
            prevValue,
          });

        }

      }

    });
  }


  if (changes.length && process.env.NODE_ENV === "development") {

    console.error("@prisma-cms/context changed changes", changes);

  }

  return changes.length;
});
