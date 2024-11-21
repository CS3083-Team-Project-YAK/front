## How to new a branch for dev

I will use `authentication` as an example, so this guide will work on a new branch called `feature/authentication`. **Change the name related to your work.**

### Step-by-Step Guide to Creating a New Feature Branch for Authentication:

#### **1. Checkout the `dev` branch**

You should always branch off from the `dev` branch to avoid conflicts with production-ready code (on `main`) and to make sure you are working with the latest changes.

```bash
git checkout dev
```

This command switches your working directory to the `dev` branch.

#### **2. Pull the latest changes from `dev`**

To ensure that you are working with the most up-to-date code, pull the latest changes from the `dev` branch.

```bash
git pull origin dev
```

This will fetch and merge any recent changes from the remote `dev` branch to your local copy.

#### **3. Create a new feature branch**

Now, create a new branch for your authentication work. The naming convention could be `feature/authentication` or something similar. It's good practice to use a descriptive name for your feature branches.

```bash
git checkout -b feature/authentication
```

Here’s what’s happening:
- `-b`: This flag creates a new branch.

- `feature/authentication`: The name of your new branch. You can choose any name, but following a structure like `feature/[feature-name]` is common.

At this point, you are on a new branch (`feature/authentication`) that is based on `dev`. You can start working on your authentication-related code here.

#### **4. Work on the Code**

Now you're on the `feature/authentication` branch, we can start writing related logic (in this example, there are login, signup components, Firebase integration, etc.). Make sure to **commit** your changes **regularly** to keep track of progress; by regularly, I mean to use `git commit` regularly.

```bash
git add .
git commit -m "{a brief summary of what you've done}"
```

#### **5. Push the Branch to the Remote Repository**

Once you’ve made some progress or completed your feature, you need to push your new branch to the remote repository.

```bash
git push origin feature/authentication
```

This command pushes the `feature/authentication` branch to remote repository on GitHub.

#### **6. Create a Pull Request (PR)**

After completing your work on the feature and pushing your branch to the remote repository, you'll want to merge it back into the `dev` branch. You can do this by creating a **pull request (PR)**.

1. Go to the repository on GitHub in browser.
2. You should see an option to create a pull request for your newly pushed branch (`feature/authentication`).
3. Create the pull request targeting the **`dev`** branch, ensuring that any team members can review it before merging.
4. Once the PR is approved, merge the `feature/authentication` branch into `dev`.

---

### Summary of Git Commands:

```bash
# 1. Switch to dev branch
git checkout dev

# 2. Pull the latest changes from dev
git pull origin dev

# 3. Create a new feature branch for authentication
git checkout -b feature/authentication

# 4. Work on the code, then add and commit changes
git add .
git commit -m "{a brief summary of what you've done}"

# 5. Push the feature branch to the remote repository
git push origin feature/authentication
```

(or use `GitLens` extension with VS Code and enjoy the GUI!)

### Optional

- enable 2FA for github account
- enable GPG Key for verified signature commits

There are lots of good tutorials online, I follow the one from github.
