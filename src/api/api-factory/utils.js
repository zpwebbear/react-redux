export function dummyResponseTransformer(response) {
  return response;
}

export const asyncCompose = (...functions) => (...input) => {
  return functions.reduceRight(async (chain, func) => {
    return chain.then((...response) => {
      return func(...response);
    });
  }, Promise.resolve(input));
};
