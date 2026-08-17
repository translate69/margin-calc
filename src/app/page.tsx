'use client';

import { useEffect, useRef, useState } from 'react';

// ===== 5 个套餐默认数据 =====
function build(list: any[][]) {
  return list.map((r) =>
    r[0] === 'group'
      ? { kind: 'group', label: r[1] }
      : {
          kind: 'item',
          name: r[0],
          pnum: r[1],
          punit: r[2],
          unitPrice: r[3],
          retail: r[4],
          cost: r[5],
          note: r[6],
          retailLock: false,
        }
  );
}

const I1 = [
  ['现熬牛骨汤', '', '锅', '', 25, null, ''],
  ['牛腩', '', '克', '', 58, 15, ''],
  ['牛杂', '', '克', '', 50, 15, ''],
  ['鲜牛肉', '100', 'g', 0.28, 28, 12, ''],
  ['牛肉饼', '4', '个', 7, 28, 4.8, ''],
  ['生菜', '', 'g', '', 15, 2, ''],
  ['秘制白萝卜', '', '克', '', 15, 1, ''],
  ['炸腐竹', '', 'g', '', 15, 2.5, ''],
  ['group', '二选一'],
  ['粿条', '1', '份', 5, 5, 2, ''],
  ['蟹黄面', '1', '包', 5, 5, 2, ''],
  ['group', '二选一'],
  ['狗毛膏', '2', '份', 6, 12, null, ''],
  ['可乐', '2', '份', 5, 10, null, ''],
  ['group', '二选一'],
  ['自制腐乳辣椒', '2', '份', 6, 12, null, ''],
  ['沙茶酱', '2', '份', 6, 12, null, ''],
];
const I2 = [
  ['现熬牛骨汤', '', '锅', '', 25, null, ''],
  ['牛腩', '', '克', '', 58, null, ''],
  ['牛杂', '', '克', '', 50, null, ''],
  ['牛排骨', '', '克', '', 38, null, ''],
  ['吊龙', '100', 'g', 0.38, 38, null, ''],
  ['牛肉丸', '4', '个', 8.75, 35, null, ''],
  ['牛肉饼', '4', '个', 7, 28, null, ''],
  ['时蔬', '', 'g', '', 15, null, ''],
  ['炸腐竹', '', 'g', '', 15, null, ''],
  ['group', '二选一'],
  ['粿条', '1', '份', 5, 5, null, ''],
  ['蟹黄面', '1', '包', 5, 5, null, ''],
  ['group', '二选一'],
  ['狗毛膏', '2', '份', 6, 12, null, ''],
  ['可乐', '2', '份', 5, 10, null, ''],
  ['group', '二选一'],
  ['自制腐乳辣椒', '2', '份', 6, 12, null, ''],
  ['沙茶酱', '2', '份', 6, 12, null, ''],
];
const I3 = [
  ['现熬牛骨汤', '', '锅', '', 25, null, ''],
  ['牛腩', '', '克', '', 65, null, ''],
  ['牛杂', '', '克', '', 60, null, ''],
  ['牛排骨', '', '克', '', 38, null, ''],
  ['吊龙', '100', 'g', 0.38, 38, null, ''],
  ['鲜牛肉', '100', 'g', 0.28, 28, null, ''],
  ['牛肉丸', '4', '个', 9.5, 38, null, ''],
  ['牛肉饼', '4', '个', 7, 28, null, ''],
  ['时蔬', '', 'g', '', 15, null, ''],
  ['炸腐竹', '', 'g', '', 15, null, ''],
  ['group', '三选二'],
  ['米饭', '2', '份', 5, 10, null, ''],
  ['粿条', '1', '份', 5, 5, null, ''],
  ['蟹黄面', '1', '包', 5, 5, null, ''],
  ['group', '二选一'],
  ['狗毛膏', '4', '份', 6, 24, null, ''],
  ['可乐', '4', '份', 5, 20, null, ''],
  ['group', '二选一'],
  ['自制腐乳辣椒', '4', '份', 6, 24, null, ''],
  ['沙茶酱', '4', '份', 6, 24, null, ''],
];
const I4 = [
  ['现熬牛骨汤', '', '锅', '', 25, null, ''],
  ['牛腩', '', '克', '', 78, null, ''],
  ['牛杂', '', '克', '', 70, null, ''],
  ['牛排骨', '', '克', '', 38, null, ''],
  ['吊龙', '100', 'g', 0.38, 38, null, ''],
  ['鲜牛肉', '100', 'g', 0.28, 28, null, ''],
  ['牛肉丸', '', '个', '', 38, null, ''],
  ['牛肉饼', '', '个', '', 28, null, ''],
  ['时蔬', '', 'g', '', 15, null, ''],
  ['炸腐竹', '', 'g', '', 15, null, ''],
  ['group', '三选二'],
  ['米饭', '2', '份', 5, 10, null, ''],
  ['粿条', '1', '份', 5, 5, null, ''],
  ['蟹黄面', '1', '包', 5, 5, null, ''],
  ['group', '二选一'],
  ['狗毛膏', '6', '份', 6, 36, null, ''],
  ['可乐', '6', '份', 5, 30, null, ''],
  ['group', '二选一'],
  ['自制腐乳辣椒', '6', '份', 6, 36, null, ''],
  ['沙茶酱', '6', '份', 6, 36, null, ''],
];
const I5 = [
  ['现熬牛骨汤', '', '锅', '', 50, null, ''],
  ['牛腩', '', '克', '', 130, null, ''],
  ['牛杂', '', '克', '', 120, null, ''],
  ['牛排骨', '', '克', '', 76, null, ''],
  ['吊龙', '200', 'g', 0.38, 76, null, ''],
  ['鲜牛肉', '200', 'g', 0.28, 56, null, ''],
  ['牛肉丸', '', '个', '', 76, null, ''],
  ['牛肉饼', '', '个', '', 56, null, ''],
  ['牛筒骨', '2', '个', 25, 50, null, ''],
  ['生菜', '', '克', '', 20, null, ''],
  ['金针菇', '', 'g', '', 12, null, ''],
  ['娃娃菜', '', 'g', '', 10, null, ''],
  ['炸腐竹', '', '克', '', 30, null, ''],
  ['group', '三选二'],
  ['米饭', '4', '份', 5, 20, null, ''],
  ['粿条', '1', '份', 5, 5, null, ''],
  ['蟹黄面', '1', '包', 5, 5, null, ''],
  ['group', '二选一'],
  ['狗毛膏', '8', '份', 6, 48, null, ''],
  ['1.25L可乐', '1', '份', 5, 5, null, ''],
  ['group', '二选一'],
  ['自制腐乳辣椒', '8', '份', 6, 48, null, ''],
  ['沙茶酱', '8', '份', 6, 48, null, ''],
];

const DEFAULT_MEALS = [
  {
    id: 'double',
    name: '牛腩牛杂火锅双人餐（4.6折）',
    retail: 273,
    discount: 4.6,
    loss: 10,
    tableStd: 2,
    tableAct: 2,
    tableUnit: 0,
    one: 0,
    lab: 0,
    gas: 0,
    rent: 0,
    items: build(I1),
  },
  {
    id: 'p23',
    name: '牛腩牛杂火锅2-3人餐（5.1折）',
    retail: 341,
    discount: 5.1,
    loss: 10,
    tableStd: 2,
    tableAct: 2,
    tableUnit: 0,
    one: 0,
    lab: 0,
    gas: 0,
    rent: 0,
    items: build(I2),
  },
  {
    id: 'p34',
    name: '牛腩牛杂火锅3-4人餐（5.4折）',
    retail: 433,
    discount: 5.4,
    loss: 10,
    tableStd: 4,
    tableAct: 4,
    tableUnit: 0,
    one: 0,
    lab: 0,
    gas: 0,
    rent: 0,
    items: build(I3),
  },
  {
    id: 'p56',
    name: '牛腩牛杂火锅5-6人餐（6.8折）',
    retail: 490,
    discount: 6.8,
    loss: 10,
    tableStd: 6,
    tableAct: 6,
    tableUnit: 0,
    one: 0,
    lab: 0,
    gas: 0,
    rent: 0,
    items: build(I4),
  },
  {
    id: 'p78',
    name: '牛腩牛杂火锅7-8人餐（5.9折）',
    retail: 923,
    discount: 5.9,
    loss: 10,
    tableStd: 8,
    tableAct: 8,
    tableUnit: 0,
    one: 0,
    lab: 0,
    gas: 0,
    rent: 0,
    items: build(I5),
  },
];

const FIELDS = ['retail', 'discount', 'loss', 'tableStd', 'tableAct', 'tableUnit', 'one', 'lab', 'gas', 'rent'];

type Meal = any;

export default function HotpotCalculator() {
  const [meals, setMeals] = useState<Meal[]>(DEFAULT_MEALS);
  const [cur, setCur] = useState(0);
  const [editing, setEditing] = useState(false);
  const [backup, setBackup] = useState<Meal[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [dbStatus, setDbStatus] = useState('');
  const m = meals[cur];

  // 工具函数
  const clone = (o: any) => JSON.parse(JSON.stringify(o));
  const num = (v: any) => {
    const n = parseFloat(v);
    return isNaN(n) || n < 0 ? 0 : n;
  };
  const pct = (x: number) => (x * 100).toFixed(1) + '%';
  const fmt = (x: number) => '¥' + x.toFixed(1);
  const priceOf = (meal: Meal) => meal.retail * meal.discount / 10;
  const foodRaw = (meal: Meal) =>
    meal.items.reduce((s: number, it: any) => s + (it.kind === 'item' && it.cost != null ? it.cost : 0), 0);
  const itemGroupPrice = (it: any) =>
    it.retail != null ? it.retail * meals[cur].discount / 10 : 0;

  // 计算
  const compute = (meal: Meal) => {
    const P = priceOf(meal);
    const fr = foodRaw(meal);
    const foodReal = fr * (1 + meal.loss / 100);
    const tableCost = meal.tableUnit * meal.tableAct;
    const tableStd = meal.tableUnit * meal.tableStd;
    const grossCost = foodReal + tableCost + meal.one;
    const costTotal = grossCost + meal.lab + meal.gas + meal.rent;
    const theoFood = fr + tableStd + meal.one;
    return {
      P,
      fr,
      foodReal,
      tableCost,
      mTheo: P > 0 ? (P - theoFood) / P : 0,
      mReal: P > 0 ? (P - grossCost) / P : 0,
      mNet: P > 0 ? (P - costTotal) / P : 0,
      tLoss: meal.tableStd > 0 ? (meal.tableAct - meal.tableStd) / meal.tableStd : 0,
    };
  };

  const r = compute(m);

  // 从数据库加载
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/meals');
        const j = await res.json();
        if (j.success && j.data && j.data.length > 0) {
          // 合并：库内有数据的套餐用库内的，否则用默认值
          const map: Record<string, any> = {};
          j.data.forEach((d: any) => {
            if (d.id && d.items && d.items.length) map[d.id] = d;
          });
          const merged = DEFAULT_MEALS.map((def) =>
            map[def.id] ? { ...def, ...map[def.id] } : def
          );
          setMeals(merged);
          setDbStatus('已从数据库加载');
        } else {
          setDbStatus('使用内置默认数据（库内暂无记录）');
        }
      } catch (e: any) {
        setDbStatus('数据库连接失败，使用本地默认数据');
        console.warn('加载失败', e);
      }
    };
    load();
  }, []);

  // 编辑控制
  const startEdit = () => {
    setBackup(clone(meals));
    setEditing(true);
  };

  const cancelEdit = () => {
    if (backup) {
      setMeals(clone(backup));
      setBackup(null);
    }
    setEditing(false);
  };

  // 保存到数据库
  const saveToDb = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meals }),
      });
      const j = await res.json();
      if (j.success) {
        alert('已保存 ✓（' + j.count + ' 个套餐已同步）');
        setEditing(false);
        setBackup(null);
        setDbStatus('已保存');
      } else {
        alert('保存失败：' + (j.error || '未知错误'));
      }
    } catch (e: any) {
      alert('保存失败：' + (e.message || e));
    } finally {
      setSaving(false);
    }
  };

  // 切换套餐
  const switchMeal = (idx: number) => {
    setCur(idx);
  };

  // 更新单个字段输入
  const handleFieldInput = (field: string, val: string) => {
    const newMeals = [...meals];
    newMeals[cur] = { ...newMeals[cur], [field]: num(val) };
    setMeals(newMeals);
  };

  // 更新菜品条目
  const updateItem = (idx: number, field: string, value: any) => {
    const newMeals = [...meals];
    const newItems = [...newMeals[cur].items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    newMeals[cur] = { ...newMeals[cur], items: newItems };
    setMeals(newMeals);
  };

  // 自动计算零售价
  const tryAutoRetail = (idx: number) => {
    const it = meals[cur].items[idx];
    if (it.retailLock) return;
    const n = parseFloat(it.pnum);
    const p = parseFloat(it.unitPrice);
    if (!isNaN(n) && !isNaN(p) && n > 0 && p >= 0) {
      updateItem(idx, 'retail', Math.round(n * p * 100) / 100);
    }
  };

  // 手动修改零售价 → 锁定
  const handleRetailChange = (idx: number, v: string) => {
    updateItem(idx, 'retail', v === '' ? null : parseFloat(v));
    updateItem(idx, 'retailLock', true);
  };

  // 成本价变更
  const handleCostChange = (idx: number, v: string) => {
    updateItem(idx, 'cost', v === '' ? null : parseFloat(v));
  };

  const disabledAttr = editing ? {} : { disabled: true };

  return (
    <div className="wrap">
      <h1>火锅套餐毛利率计算器 · 多套餐</h1>
      <p className="tip">
        下拉切换套餐 → 点「编辑」填写 → 点「保存」同步到数据库。默认只读防误改。
        <span style={{ marginLeft: '8px', color: '#6b7280' }}>{dbStatus}</span>
      </p>

      <div className="banner">
        📋 <b>已内置 5 个套餐</b>：菜品名字、分量、单位、零售价、团购价已铺好；能按分量反推出的「零售单价」已预填。
        <br />
        ✍️ <b>毛利率只看「成本价」</b>（红框=未填）；分量/单价/零售价只影响定价展示，改它们不会直接改毛利率。手动修改零售价的行会标黄锁定。
        <br />
        💾 <b>编辑 / 保存</b>：默认只读，点「编辑」解锁所有输入框，点「保存」把 5 个套餐同步到数据库。
        <br />
        ⚠️ 首次使用：数据已内置在代码里，开箱即见；点「保存」即可写入数据库供多人共享。
      </div>

      <div className="selbar">
        <label>选择套餐：</label>
        <select value={cur} onChange={(e) => switchMeal(parseInt(e.target.value))}>
          {meals.map((m, i) => (
            <option key={m.id} value={i}>
              {m.name}
            </option>
          ))}
        </select>
        {!editing ? (
          <button className="btn" onClick={startEdit}>
            编辑
          </button>
        ) : (
          <>
            <button className="btn" onClick={saveToDb} disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </button>
            <button className="btn ghost" onClick={cancelEdit}>
              取消
            </button>
          </>
        )}
      </div>

      <div className="grid">
        <div className="card">
          <h2>
            ① 套餐与可变成本 <span className="tag">计入毛利</span>
          </h2>
          <div className="row">
            <label>零售价（原价，元）</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.retail}
              onChange={(e) => handleFieldInput('retail', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>折扣（折，如 4.6）</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={m.discount}
              onChange={(e) => handleFieldInput('discount', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="hint">售价（团购成交价）= 零售价 × 折扣，自动计算</div>
          <div className="priceview">售价（团购价）= {fmt(r.P)}</div>

          <div className="sub-h">食材明细（分量×单价=零售价，手动改零售价的行会标黄锁定）</div>
          <table className="items">
            <thead>
              <tr>
                <th>菜品名字</th>
                <th>分量</th>
                <th>单位</th>
                <th>零售单价</th>
                <th>零售价</th>
                <th>团购价</th>
                <th>成本价</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {m.items.map((it: any, idx: number) => {
                if (it.kind === 'group') {
                  return (
                    <tr key={'g' + idx} className="group">
                      <td colSpan={8}>{it.label}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx}>
                    <td>{it.name}</td>
                    <td>
                      <input
                        className="pn"
                        value={it.pnum != null ? it.pnum : ''}
                        type="number"
                        step="any"
                        onChange={(e) => updateItem(idx, 'pnum', e.target.value)}
                        onBlur={() => tryAutoRetail(idx)}
                        {...disabledAttr}
                      />
                    </td>
                    <td>
                      <input
                        className="pu"
                        value={it.punit != null ? it.punit : ''}
                        onChange={(e) => updateItem(idx, 'punit', e.target.value)}
                        {...disabledAttr}
                      />
                    </td>
                    <td className="num">
                      <input
                        className="up"
                        value={it.unitPrice != null ? it.unitPrice : ''}
                        type="number"
                        step="any"
                        onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)}
                        onBlur={() => tryAutoRetail(idx)}
                        {...disabledAttr}
                      />
                    </td>
                    <td className="num">
                      <input
                        className={'ret' + (it.retailLock ? ' locked' : '')}
                        value={it.retail != null ? it.retail : ''}
                        type="number"
                        step="any"
                        onChange={(e) => handleRetailChange(idx, e.target.value)}
                        {...disabledAttr}
                      />
                    </td>
                    <td className="num">{fmt(itemGroupPrice(it))}</td>
                    <td className="num">
                      <input
                        className={'cost' + (it.cost == null ? ' zero' : '')}
                        value={it.cost == null ? '' : it.cost}
                        type="number"
                        step="any"
                        onChange={(e) => handleCostChange(idx, e.target.value)}
                        {...disabledAttr}
                      />
                    </td>
                    <td>
                      <input
                        className="note"
                        value={it.note != null ? it.note : ''}
                        placeholder="如：100g/份"
                        onChange={(e) => updateItem(idx, 'note', e.target.value)}
                        {...disabledAttr}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="sum">
                <td colSpan={6}>食材成本小计（未计损耗）</td>
                <td className="num">{fmt(foodRaw(m))}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="row" style={{ marginTop: '10px' }}>
            <label>食材损耗率（%）</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.loss}
              onChange={(e) => handleFieldInput('loss', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="hint">切配下脚料 + 化冻失水 + 剩菜 + 报损，火锅店常见 8%~15%</div>

          <div className="sub-h">一次性餐具（按实际用量）</div>
          <div className="row">
            <label>套餐给的套数（标准）</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={m.tableStd}
              onChange={(e) => handleFieldInput('tableStd', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>实际平均用量（套/套）</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={m.tableAct}
              onChange={(e) => handleFieldInput('tableAct', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>单套餐具成本（元）</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.tableUnit}
              onChange={(e) => handleFieldInput('tableUnit', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>一次性用品（围裙/纸巾）</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.one}
              onChange={(e) => handleFieldInput('one', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="pill">餐具超额使用率：{(r.tLoss * 100).toFixed(0)}%</div>
        </div>

        <div className="card">
          <h2>
            ② 营运费用 <span className="tag">计入净利</span>
          </h2>
          <div className="hint">固定/半固定开支，不随每套餐具用量变，放净利层看</div>
          <div className="row">
            <label>人工分摊</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.lab}
              onChange={(e) => handleFieldInput('lab', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>燃气 / 水电</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.gas}
              onChange={(e) => handleFieldInput('gas', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="row">
            <label>租金 / 其他分摊</label>
            <input
              type="number"
              step="any"
              min="0"
              value={m.rent}
              onChange={(e) => handleFieldInput('rent', e.target.value)}
              {...disabledAttr}
            />
          </div>
          <div className="note" style={{ marginTop: '14px' }}>
            · 双人餐给 2 套、实际用 3 套 → 餐具多耗 50%，直接吃毛利。
            <br />
            · 改「折扣」售价自动跟着变。
            <br />
            · 填完点「保存」可同步给团队。
          </div>
        </div>
      </div>

      <div className="result">
        <div className="big">
          <div className="metric">
            <div className="k">理论毛利率（标准用量）</div>
            <div className="v green">{pct(r.mTheo)}</div>
            <div className="d">
              食材+餐具(标准) {fmt(foodRaw(m) + m.tableUnit * m.tableStd + m.one)}
            </div>
          </div>
          <div className="metric">
            <div className="k">实际毛利率（含损耗+餐具）</div>
            <div className="v red">{pct(r.mReal)}</div>
            <div className="d">
              实际成本 {fmt(r.foodReal + m.tableUnit * m.tableAct + m.one)}
            </div>
          </div>
          <div className="metric">
            <div className="k">净利率（扣全部费用）</div>
            <div className="v blue">{pct(r.mNet)}</div>
            <div className="d">
              每套净利{' '}
              {fmt(r.P - (r.foodReal + m.tableUnit * m.tableAct + m.one + m.lab + m.gas + m.rent))}
            </div>
          </div>
        </div>

        <div className="bars">
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            当前套餐成本结构（售价 100% 去了哪）
          </div>
          {[
            { id: 'bFood', name: '食材(含损耗/锅底/蘸料/饮品)', val: r.foodReal, cls: 'f-food' },
            { id: 'bTable', name: '一次性餐具', val: r.tableCost, cls: 'f-table' },
            { id: 'bOne', name: '一次性用品', val: m.one, cls: 'f-one' },
            { id: 'bLab', name: '人工', val: m.lab, cls: 'f-lab' },
            { id: 'bGas', name: '燃气水电', val: m.gas, cls: 'f-gas' },
            { id: 'bRent', name: '租金其他', val: m.rent, cls: 'f-rent' },
          ].map((bar) => {
            const w = r.P > 0 ? Math.min((bar.val / r.P) * 100, 100) : 0;
            return (
              <div className="bar" key={bar.id}>
                <span className="name">{bar.name}</span>
                <div className="track">
                  <div
                    className={'fill ' + bar.cls}
                    style={{ width: w + '%' }}
                  >
                    {r.P > 0 ? pct(bar.val / r.P) : ''}
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="warn"
            style={{ display: r.mReal < 0.5 || r.mNet < 0.15 ? 'block' : 'none' }}
          >
            ⚠️ 实际毛利率低于 50% 或净利率低于 15%，这套餐定价偏紧，建议复核售价或压损耗。
          </div>
        </div>

        <div style={{ fontSize: '14px', fontWeight: 600, margin: '4px 0 2px' }}>
          5 个套餐横向对比
        </div>
        <table className="cmp">
          <thead>
            <tr>
              <th>套餐</th>
              <th>原价</th>
              <th>折扣</th>
              <th>售价</th>
              <th>理论毛利率</th>
              <th>实际毛利率</th>
              <th>净利率</th>
              <th>餐具超额</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, i) => {
              const cr = compute(meal);
              return (
                <tr key={meal.id}>
                  <td>
                    {meal.name}
                    {i === cur ? ' ·' : ''}
                  </td>
                  <td>{fmt(meal.retail)}</td>
                  <td>{meal.discount}折</td>
                  <td>{fmt(cr.P)}</td>
                  <td className="g">{pct(cr.mTheo)}</td>
                  <td className="g">{pct(cr.mReal)}</td>
                  <td className="b">{pct(cr.mNet)}</td>
                  <td>{(cr.tLoss * 100).toFixed(0)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="note">
          注：对比表读取各套餐已填写的数值。改完任一套餐后切回它即可刷新对比。成本未填的套餐毛利率会虚高，先补全再比。
        </div>
      </div>

      <style jsx global>{`
        :root {
          --bg: #f7f8fa;
          --card: #fff;
          --ink: #1f2329;
          --sub: #6b7280;
          --line: #e5e7eb;
          --brand: #e0322d;
          --brand-soft: #fdecea;
          --green: #0a8f3c;
          --blue: #2563eb;
          --amber: #b7791f;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
          background: var(--bg);
          color: var(--ink);
          padding: 20px;
          line-height: 1.5;
        }
        .wrap {
          max-width: 1100px;
          margin: 0 auto;
        }
        h1 {
          font-size: 20px;
          margin: 0 0 4px;
        }
        .tip {
          color: var(--sub);
          font-size: 13px;
          margin: 0 0 10px;
        }
        .banner {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12.5px;
          margin: 0 0 14px;
          line-height: 1.6;
        }
        .banner b {
          color: #b45309;
        }
        .selbar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .selbar label {
          font-size: 14px;
          font-weight: 600;
        }
        select {
          padding: 9px 12px;
          border: 1px solid var(--line);
          border-radius: 9px;
          font-size: 14px;
          background: #fff;
          color: var(--ink);
          min-width: 220px;
        }
        .btn {
          padding: 8px 14px;
          border: 1px solid var(--brand);
          background: var(--brand);
          color: #fff;
          border-radius: 9px;
          font-size: 13px;
          cursor: pointer;
        }
        .btn.ghost {
          background: #fff;
          color: var(--brand);
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
        }
        .card h2 {
          font-size: 15px;
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .card h2 .tag {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 20px;
          background: var(--brand-soft);
          color: var(--brand);
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 8px 0;
          gap: 10px;
        }
        .row label {
          font-size: 14px;
          color: #374151;
          flex: 1;
        }
        .row input {
          width: 110px;
          padding: 7px 9px;
          border: 1px solid var(--line);
          border-radius: 8px;
          font-size: 14px;
          text-align: right;
          background: #fff;
          color: var(--ink);
        }
        .row input:focus {
          outline: none;
          border-color: var(--brand);
        }
        .priceview {
          text-align: right;
          font-size: 17px;
          font-weight: 700;
          color: var(--brand);
          margin: 2px 0 4px;
        }
        .hint {
          font-size: 11px;
          color: var(--sub);
          margin: -2px 0 6px;
        }
        .sub-h {
          font-size: 12px;
          font-weight: 600;
          color: var(--brand);
          margin: 14px 0 6px;
          border-top: 1px dashed var(--line);
          padding-top: 10px;
        }
        table.items {
          width: 100%;
          border-collapse: collapse;
          margin-top: 4px;
          table-layout: fixed;
        }
        table.items th,
        table.items td {
          padding: 7px 5px;
          text-align: left;
          font-size: 13px;
          border-bottom: 1px solid var(--line);
          vertical-align: middle;
        }
        table.items th {
          color: var(--sub);
          font-weight: 600;
          background: #fafafa;
        }
        table.items td.num,
        table.items th.num {
          text-align: right;
        }
        table.items th:nth-child(1) {
          width: 18%;
        }
        table.items th:nth-child(2),
        table.items th:nth-child(3) {
          width: 9%;
        }
        table.items th:nth-child(4),
        table.items th:nth-child(5),
        table.items th:nth-child(6),
        table.items th:nth-child(7) {
          width: 12%;
        }
        table.items th:nth-child(8) {
          width: 16%;
        }
        table.items input {
          width: 100%;
          padding: 5px 6px;
          border: 1px solid var(--line);
          border-radius: 7px;
          font-size: 13px;
          color: var(--ink);
        }
        table.items input:focus {
          outline: none;
          border-color: var(--brand);
        }
        table.items input.cost {
          text-align: right;
        }
        table.items input.cost.zero {
          border-color: #f0b4b0;
          background: #fff8f7;
        }
        table.items input.pn {
          text-align: right;
        }
        table.items input.pu {
          text-align: left;
        }
        table.items input.ret {
          text-align: right;
          background: #fff;
        }
        table.items input.ret.locked {
          background: #fffbeb;
          border-color: #fde68a;
        }
        table.items input.note {
          text-align: left;
        }
        table.items tr.group td {
          background: #f4f5f7;
          color: var(--brand);
          font-weight: 600;
          font-size: 12px;
          padding-left: 6px;
        }
        table.items tr.sum td {
          font-weight: 700;
          border-top: 2px solid var(--line);
        }
        input:disabled {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }
        .result {
          margin-top: 18px;
        }
        .big {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 640px) {
          .big {
            grid-template-columns: 1fr;
          }
        }
        .metric {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .metric .k {
          font-size: 13px;
          color: var(--sub);
        }
        .metric .v {
          font-size: 28px;
          font-weight: 700;
          margin-top: 6px;
        }
        .metric .d {
          font-size: 12px;
          color: var(--sub);
          margin-top: 4px;
        }
        .v.red {
          color: var(--brand);
        }
        .v.green {
          color: var(--green);
        }
        .v.blue {
          color: var(--blue);
        }
        .bars {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .bar {
          display: flex;
          align-items: center;
          margin: 10px 0;
          font-size: 13px;
        }
        .bar .name {
          width: 170px;
          color: #374151;
          flex: none;
        }
        .bar .track {
          flex: 1;
          height: 22px;
          background: #f0f1f3;
          border-radius: 6px;
          overflow: hidden;
        }
        .bar .fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          color: #fff;
          font-size: 12px;
          border-radius: 6px;
        }
        .f-food {
          background: var(--brand);
        }
        .f-table {
          background: #0891b2;
        }
        .f-one {
          background: #7c3aed;
        }
        .f-lab {
          background: #475569;
        }
        .f-gas {
          background: #64748b;
        }
        .f-rent {
          background: #9333ea;
        }
        .note {
          font-size: 12px;
          color: var(--sub);
          margin-top: 10px;
          line-height: 1.6;
        }
        .warn {
          background: var(--brand-soft);
          border: 1px solid #f5c6c2;
          color: #a8201a;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12px;
          margin-top: 12px;
          display: none;
        }
        .pill {
          display: inline-block;
          background: #fff7ed;
          color: var(--amber);
          font-size: 12px;
          padding: 3px 9px;
          border-radius: 20px;
          margin-top: 8px;
          border: 1px solid #fde0b5;
        }
        table.cmp {
          width: 100%;
          border-collapse: collapse;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 6px;
        }
        table.cmp th,
        table.cmp td {
          padding: 10px 8px;
          text-align: center;
          font-size: 13px;
          border-bottom: 1px solid var(--line);
        }
        table.cmp th {
          background: #fafafa;
          color: var(--sub);
          font-weight: 600;
        }
        table.cmp td:first-child {
          text-align: left;
          font-weight: 600;
          color: #374151;
        }
        .g {
          color: var(--green);
          font-weight: 600;
        }
        .b {
          color: var(--blue);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
