import scaffold1gy6 from '../../cases/protein_design/1GY6_clean.png';
import scaffold4fcj from '../../cases/protein_design/4FCJ_clean.png';
import scaffold3mg1 from '../../cases/protein_design/3MG1_clean.png';
import scaffold2qiy from '../../cases/protein_design/2QIY_clean.png';
import scaffold2a15 from '../../cases/protein_design/2A15_clean.png';
import complex1gy6 from '../../cases/protein_design/1GY6_complex.png';
import complex4fcj from '../../cases/protein_design/4FCJ_complex.png';
import complex3mg1 from '../../cases/protein_design/3MG1_complex.png';
import complex2qiy from '../../cases/protein_design/2QIY_complex.png';
import complex2a15 from '../../cases/protein_design/2A15_complex.png';
import apixabanImage from '../../cases/protein_design/apixaban.png';
import pocketDiversityImage from '../../cases/protein_design/pocket_diversity.png';
import dockingSummaryImage from '../../cases/protein_design/docking_results_summary.png';
import sequenceSummaryImage from '../../cases/protein_design/sequence_design_summary.png';

export const proteinDesignPrompt = '将 apixaban 装入一组具有 NTF2-like fold 的蛋白口袋中，使用 AutoDock Vina 搜索合理的 protein–ligand pose，使用 LigandMPNN 设计与配体兼容的蛋白序列';

export const proteinDesignPlan = [
  '1) 下载并处理 NTF2-like 蛋白骨架，提取 chain A 单体并去除配体/水分子',
  '2) 获取 apixaban 配体 3D 结构，验证 59 个原子并转换为 PDBQT',
  '3) 分析 NTF2 口袋几何、氨基酸组成和潜在结合残基',
  '4) 创建初始蛋白质-配体复合物',
  '5) 使用 AutoDock Vina 进行对接并汇总 docking affinity',
  '6) 运行 LigandMPNN 进行口袋序列设计，并汇总 HTML 报告',
];

export const proteinDesignCode = [
  "pdb_ids = ['1GY6','4FCJ','3MG1','2QIY','2A15']",
  "clean_pdbs = [prepare_chain_a(pdb) for pdb in pdb_ids]",
  "apx = pubchem_download_3d(cid=10182969, out='apixaban.sdf')",
  "assert rdkit_num_atoms(apx, add_h=True) == 59",
  "pockets = convex_hull_pockets(clean_pdbs, out='pocket_characterization.csv')",
  "vina_table = run_vina_batch(clean_pdbs, apx, out='docking_summary.csv')",
  "top_pose = vina_table.sort_values('best_affinity').iloc[0]",
  "designs = run_ligandmpnn(top_pose.complex_pdb, temps=[0.1,0.3,0.5])",
  "render_report(figures, tables, designs, out='apixaban_ntf2_report.html')",
];

export const proteinDesignLogs = [
  '5 NTF2-like chain-A monomers cleaned',
  'Apixaban CID 10182969 validated: 59 atoms',
  'Pocket residues selected across 5 scaffolds',
  'Protein-ligand complexes initialized',
  'Read docking_summary.csv best_affinity: 3MG1 = -8.741 kcal/mol',
  '15 LigandMPNN threaded designs exported',
];

export const proteinDesignScaffolds = [
  { id: '1GY6', label: 'rat NTF2', residues: 125, image: scaffold1gy6 },
  { id: '4FCJ', label: 'human G3BP1', residues: 128, image: scaffold4fcj },
  { id: '3MG1', label: 'cyanobacterial OCP', residues: 302, image: scaffold3mg1 },
  { id: '2QIY', label: 'yeast Bre5', residues: 134, image: scaffold2qiy },
  { id: '2A15', label: 'Mtb RV0760', residues: 133, image: scaffold2a15 },
];

export const proteinDesignComplexes = [
  { id: '3MG1', label: 'best affinity -8.741 kcal/mol', image: complex3mg1 },
  { id: '4FCJ', label: '-7.242 kcal/mol', image: complex4fcj },
  { id: '1GY6', label: '-6.094 kcal/mol', image: complex1gy6 },
  { id: '2QIY', label: '-5.993 kcal/mol', image: complex2qiy },
  { id: '2A15', label: '-4.993 kcal/mol', image: complex2a15 },
];

export const proteinDesignSlides = [
  {
    step: 'STEP 01',
    title: '5 个 NTF2-like 骨架完成清洗',
    description: '提取 chain A 单体，去除配体和水分子，生成统一的 scaffold table。',
    visual: 'scaffolds',
    metrics: ['5 scaffolds', '125-302 residues', 'chain A only'],
    files: '1GY6_clean.pdb · 4FCJ_clean.pdb · 3MG1_clean.pdb · 2QIY_clean.pdb · 2A15_clean.pdb · ntf2_scaffolds.csv',
  },
  {
    step: 'STEP 02',
    title: 'Apixaban 3D 配体结构就绪',
    description: '从 PubChem CID 10182969 获取 3D SDF，验证分子式和原子数后转换为 docking 输入。',
    visual: 'ligand',
    metrics: ['C25H25N5O4', 'MW 459.5', '59 atoms'],
    files: 'apixaban.sdf · apixaban_smiles.txt · apixaban_info.csv',
  },
  {
    step: 'STEP 03',
    title: '口袋几何和可药性分析',
    description: '使用凸包方法计算口袋体积、疏水比例、druggability score，并选出可设计口袋残基。',
    image: pocketDiversityImage,
    metrics: ['3907-15549 A3', '14-35 designable residues', 'druggability 1.3-1.5'],
    files: 'pocket_characterization.csv · pocket_diversity.png',
  },
  {
    step: 'STEP 04',
    title: 'Protein-ligand pose 搜索与打分',
    description: '构建初始复合物并用 AutoDock Vina 对 apixaban pose 打分；3MG1 在 docking_summary.csv 的 best_affinity 最优。',
    image: dockingSummaryImage,
    metrics: ['best scaffold 3MG1', 'Vina best_affinity -8.741 kcal/mol', '5 docking summaries'],
    files: 'docking_summary.csv · 1GY6_complex.pdb · 3MG1_complex.pdb · 4FCJ_complex.pdb',
  },
  {
    step: 'STEP 05',
    title: 'LigandMPNN 口袋序列设计',
    description: '在 T=0.1/0.3/0.5 三个温度下生成 15 条口袋兼容序列，并回穿到原始骨架。',
    image: sequenceSummaryImage,
    metrics: ['15 sequences', '3 temperatures', '15 threaded PDBs'],
    files: 'designed_sequences.csv · designed_sequences.fasta · sequence_design_summary.png · mutation_summary.csv',
  },
  {
    step: 'STEP 06',
    title: '候选 protein-apixaban 复合物',
    description: '汇总 HTML 报告，并展示排名靠前 scaffold 中 apixaban 的 protein-ligand pose demo。',
    visual: 'pose',
    metrics: ['3MG1 selected', '302 residues', 'apixaban pose embedded'],
    files: 'apixaban_ntf2_report.html · pocket_mutation_analysis.json · threaded_{PDB}_T{T}.pdb',
  },
];

export const apixabanLigandImage = apixabanImage;
export const proteinDesignTopComplexImage = complex3mg1;
