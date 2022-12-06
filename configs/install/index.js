import { exec } from "child_process";

const __PROD__ = process.env.NODE_ENV === "production";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function run(str) {
  if (!__PROD__) {
    exec(str, (err, stdout, stderr) => {
      if (err) {
        console.log(new Error(err, { cause: stderr }));
      }
      console.log(stdout);
    });
  }
}

run("husky install");
run("git config core.hooksPath .git-hooks");
