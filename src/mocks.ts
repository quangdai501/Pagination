const mocks = Array.from({ length: 2001 }, (v, i) => i).map((val) => ({
  header: `This is the header ${val + 1}`,
  content: `This is the item ${val + 1}`,
}));

const promise: () => Promise<Array<MockData>> = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mocks);
    }, 1500);
  });

type MockData = {
  header: string;
  content: string;
};
export { promise, MockData, mocks };
