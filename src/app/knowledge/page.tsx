import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { knowledgeArticles } from '@/data/knowledge';
import { getTranslations } from 'next-intl/server';

const categories = [
  { icon: '🔧', title: 'Equipment & Hardware', desc: 'Machine setup, maintenance guides, troubleshooting', count: 45 },
  { icon: '📱', title: 'Platform & Software', desc: 'Dashboard guides, app features, integrations', count: 32 },
  { icon: '💳', title: 'Billing & Payments', desc: 'Invoicing, payment methods, refunds', count: 18 },
  { icon: '⭐', title: 'Memberships', desc: 'Plans, upgrades, cancellations', count: 24 },
  { icon: '📊', title: 'Operations', desc: 'Daily operations, reporting, best practices', count: 28 },
  { icon: '🎓', title: 'Training', desc: 'Staff training, onboarding, certifications', count: 15 },
];

const categoryLabels: Record<string, string> = {
  equipment: 'Equipment & Hardware',
  platform: 'Platform & Software',
  billing: 'Billing & Payments',
  memberships: 'Memberships',
  operations: 'Operations',
  training: 'Training',
};

function formatUpdatedAt(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date('2024-12-08');
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Updated today';
  if (diffDays === 1) return 'Updated 1 day ago';
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  return `Updated ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

const popularArticles = knowledgeArticles
  .filter((a) => a.contentType === 'article')
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

const recentArticles = knowledgeArticles
  .filter((a) => a.contentType === 'article')
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 4);

const videoTutorials = knowledgeArticles.filter((a) => a.contentType === 'video');

export default async function KnowledgePage() {
  const t = await getTranslations('knowledge');
  const tc = await getTranslations('common');

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">{tc('breadcrumbs.technical')}</Link>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          {t('breadcrumb')}
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{t('title')}</h1>
            <p className="page-subtitle">{t('subtitle')}</p>
          </div>
          <div className="page-actions">
            <button className="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              {t('actions.newArticle')}
            </button>
          </div>
        </div>
      </div>

      <div className="card search-hero">
        <div className="search-hero-content">
          <h2>{t('search.heading')}</h2>
          <div className="search-box-large">
            <input type="text" placeholder={t('search.placeholder')} />
            <button className="btn btn-primary">{tc('actions.search')}</button>
          </div>
        </div>
      </div>

      <div className="kb-categories">
        {categories.map((cat) => (
          <div className="kb-category" key={cat.title}>
            <div className="category-icon">{cat.icon}</div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
            <span className="article-count">{t('categories.articleCount', { count: cat.count })}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>{t('sections.popularArticles')}</h3>
        </div>
        <div className="article-list">
          {popularArticles.map((article) => (
            <a href="#" className="article-item" key={article.id}>
              <span className="article-icon">📄</span>
              <div className="article-content">
                <div className="article-title">{article.title}</div>
                <div className="article-meta">{categoryLabels[article.category]} · Updated {new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
              <span className="article-views">{article.views.toLocaleString()} {t('sections.views')}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h3>{t('sections.recentlyUpdated')}</h3>
          </div>
          <div className="article-list compact">
            {recentArticles.map((article) => (
              <a href="#" className="article-item" key={article.id}>
                <div className="article-content">
                  <div className="article-title">{article.title}</div>
                  <div className="article-meta">{formatUpdatedAt(article.updatedAt)}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{t('sections.videoTutorials')}</h3>
          </div>
          <div className="video-list">
            {videoTutorials.map((video) => (
              <a href="#" className="video-item" key={video.id}>
                <div className="video-thumb">▶️</div>
                <div className="video-content">
                  <div className="video-title">{video.title}</div>
                  <div className="video-meta">{video.videoDuration} · {video.videoLevel ? video.videoLevel.charAt(0).toUpperCase() + video.videoLevel.slice(1) : ''}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
