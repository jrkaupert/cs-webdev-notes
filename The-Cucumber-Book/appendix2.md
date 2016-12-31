[Table of Contents](_toc.md)

[Previous Chapter](appendix1.md)

---

# Appendix 2: Installing Cucumber #
- Have to have a recent version (>2.0.0) of Ruby installed
- See the following location for Windows download:
[rubyinstaller.org/downloads](https://rubyinstaller.org/downloads/)
- OSX and Linux require a C compiler and it is recommended to install Ruby
using RVM.  See the web or Appendix 2 of this book for more info.

- It may also be necessary for some gems (ones that use C extensions) to have
the [Ruby Development Kit](http://rubyinstaller.org/add-ons/devkit/) installed
for Windows

- For colored console output, it is also necessary (on Windows) to download
a tool: [Ansicon v1.66](https://github.com/adoxa/ansicon/releases) (this is
a newer link than the book)
- To install, unzip the latest version to `C:/ansicon`, `cd` to the folder,
`cd` to `x64` or `x86`, then install by running the executable.  Close the
command prompt and reopen afterward.

- To install Bundler, once Ruby is installed, run `gem install bundler`

- To install Cucumber, run `gem install cucumber`.
- Alternatively, ensure it is in a Gemfile in your project with a line similar
to `gem 'cucumber', '2.0.0'`, then use `bundle install` to install all gems
for that project using Bundler
- Run `cucumber --help` to verify it has been installed correctly

---
[Table of Contents](_toc.md)

[Next Chapter](appendix3.md)
