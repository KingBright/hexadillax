# HeXadillaX

This is a modified version of [XadillaX/hexadillax](https://github.com/XadillaX/hexadillax), of which the original author is Xadilla.

## Usage

### CONFIG

Copy `_config.sample.yml` to `_config.yml`.

And edit the subjects.

### TAGS && CATEGORIES

Create two folders under your `source` directory: `tags` and `categories`.

Create an `index.md` file under each folder that you've just created.

`tags/index.md`:

```markdown
layout: tags
title: tags
---
```

`categories/index.md`:

```markdown
layout: categories
title: categories
---
```

### DISQUS

Create your own [DISQUS](https://publishers.disqus.com/) for your site and replace `disqus short_name` in `_config.yml`.

### 百度统计

向 `_config.yml` 配置文件添加`baidu_analytics: 你的统计ID`

### 单篇文章开启 Mathjax

向 `_config.yml` 文章源码文件头部添加 `mathjax: true`


