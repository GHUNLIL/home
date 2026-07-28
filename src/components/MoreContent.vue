<template>
  <section class="more-content" aria-labelledby="services-title">
    <header>
      <p class="eyebrow">UNLIL / SERVICES</p>
      <h2 id="services-title">业务与合作</h2>
      <p class="summary">围绕技术基础设施、跨境业务与俄语内容提供长期实践和项目协作。</p>
    </header>

    <ul class="service-list">
      <li v-for="service in services" :key="service.title">
        <span class="index">{{ service.index }}</span>
        <span>
          <strong>{{ service.title }}</strong>
          <small>{{ service.description }}</small>
        </span>
      </li>
    </ul>

    <nav class="actions" aria-label="业务与合作入口">
      <a href="mailto:info@unlil.com">邮件联系</a>
      <a href="https://dev.unlil.com/projects" target="_blank" rel="noopener noreferrer">查看项目</a>
    </nav>
  </section>
</template>

<script setup lang="ts">
const services = [
  { index: "01", title: "中俄跨境商贸", description: "资源对接、信息整理与项目协作" },
  { index: "02", title: "TikTok 业务", description: "内容方向、账号与跨境场景研究" },
  { index: "03", title: "服务器业务", description: "VPS、网络优化、转发与自动化工具" },
  { index: "04", title: "俄剧与俄语内容", description: "内容整理、传播与社区运营" },
  { index: "05", title: "公众号与内容合作", description: "技术文章、评测与专题内容" },
];
</script>

<style lang="scss" scoped>
.more-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: var(--bento-text);

  header {
    padding-right: 72px;
  }

  .eyebrow {
    margin: 0 0 6px;
    color: var(--bento-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
  }

  h2 {
    margin: 0;
    font-size: 1.45rem;
    letter-spacing: 0.04em;
  }

  .summary {
    margin: 7px 0 0;
    color: var(--bento-muted);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .service-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin: 14px 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      gap: 9px;
      min-width: 0;
      padding: 8px 9px;
      border: 1px solid var(--bento-border);
      background: rgba(255, 255, 255, 0.025);

      &:last-child {
        grid-column: 1 / -1;
      }
    }

    .index {
      color: var(--bento-muted);
      font-family: var(--font-mono);
      font-size: 0.68rem;
    }

    strong,
    small {
      display: block;
    }

    strong {
      font-size: 0.8rem;
      font-weight: 650;
    }

    small {
      margin-top: 2px;
      overflow: hidden;
      color: var(--bento-muted);
      font-size: 0.68rem;
      line-height: 1.35;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .actions {
    display: flex;
    gap: 9px;

    a {
      flex: 1;
      padding: 8px 10px;
      border: 1px solid var(--bento-border);
      color: var(--bento-text);
      font-size: 0.78rem;
      text-align: center;
      text-decoration: none;
      transition: 0.2s ease;

      &:hover,
      &:focus-visible {
        border-color: var(--bento-border-hover);
        background: rgba(255, 255, 255, 0.08);
      }
    }
  }
}
</style>
