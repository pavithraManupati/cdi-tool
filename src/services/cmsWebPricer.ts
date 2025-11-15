/**
 * CMS WebPricer API Integration
 * Documentation: https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/AcuteInpatientPPS/WebPricer
 */

export interface DRGPricingRequest {
  drg: string // DRG code (e.g., "291")
  dischargeDate: string // Format: YYYY-MM-DD
  admitDate: string // Format: YYYY-MM-DD
  providerId?: string // 6-digit Medicare provider number
  drgVersion?: string // MS-DRG version (e.g., "40" for FY2023)
  outlierThreshold?: number
  wage_index?: number // Hospital wage index
  teaching_adjustment?: number
  dsh_adjustment?: number // Disproportionate Share Hospital
}

export interface DRGPricingResponse {
  drg: string
  drgDescription: string
  basePaymentRate: number
  totalPayment: number
  outlierPayment: number
  capitalPayment: number
  wage_index: number
  geometricMeanLOS: number
  arithmeticMeanLOS: number
  success: boolean
  error?: string
}

// CMS WebPricer endpoint (use their test/production endpoint)
const CMS_WEBPRICER_BASE_URL = 'https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/AcuteInpatientPPS/WebPricer'

/**
 * Fetch DRG pricing from CMS WebPricer API
 * Note: This is a simplified version. The actual CMS API may require additional parameters
 * and authentication depending on the endpoint used.
 */
export async function fetchDRGPricing(request: DRGPricingRequest): Promise<DRGPricingResponse> {
  try {
    // CMS WebPricer may require form data or specific format
    // This is a generic implementation - adjust based on actual API requirements
    
    const params = new URLSearchParams({
      drg: request.drg,
      discharge_date: request.dischargeDate,
      admit_date: request.admitDate,
      ...(request.providerId && { provider_id: request.providerId }),
      ...(request.drgVersion && { drg_version: request.drgVersion }),
    })

    // Note: CMS WebPricer might not have a REST API endpoint
    // You may need to use their web interface or a third-party service
    // Consider using: https://www.cms.gov/medicare/payment/prospective-payment-systems/acute-inpatient-pps/webpricer-service
    
    const response = await fetch(`${CMS_WEBPRICER_BASE_URL}/api/calculate?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`CMS WebPricer API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      drg: data.drg || request.drg,
      drgDescription: data.description || '',
      basePaymentRate: data.base_payment || 0,
      totalPayment: data.total_payment || 0,
      outlierPayment: data.outlier_payment || 0,
      capitalPayment: data.capital_payment || 0,
      wage_index: data.wage_index || request.wage_index || 1.0,
      geometricMeanLOS: data.geometric_mean_los || 0,
      arithmeticMeanLOS: data.arithmetic_mean_los || 0,
      success: true,
    }
  } catch (error) {
    console.error('Error fetching DRG pricing:', error)
    return {
      drg: request.drg,
      drgDescription: 'Error fetching DRG information',
      basePaymentRate: 0,
      totalPayment: 0,
      outlierPayment: 0,
      capitalPayment: 0,
      wage_index: 1.0,
      geometricMeanLOS: 0,
      arithmeticMeanLOS: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Mock DRG pricing for development/testing
 * Replace with actual API calls in production
 */
export function getMockDRGPricing(drg: string): DRGPricingResponse {
  // Sample DRG pricing data based on CMS averages
  const mockData: Record<string, Omit<DRGPricingResponse, 'drg' | 'success'>> = {
    '291': {
      drgDescription: 'Heart Failure & Shock w MCC',
      basePaymentRate: 8500,
      totalPayment: 9850,
      outlierPayment: 0,
      capitalPayment: 1350,
      wage_index: 1.15,
      geometricMeanLOS: 4.5,
      arithmeticMeanLOS: 5.2,
    },
    '292': {
      drgDescription: 'Heart Failure & Shock w CC',
      basePaymentRate: 6200,
      totalPayment: 7130,
      outlierPayment: 0,
      capitalPayment: 930,
      wage_index: 1.15,
      geometricMeanLOS: 3.8,
      arithmeticMeanLOS: 4.3,
    },
    '293': {
      drgDescription: 'Heart Failure & Shock w/o CC/MCC',
      basePaymentRate: 4800,
      totalPayment: 5520,
      outlierPayment: 0,
      capitalPayment: 720,
      wage_index: 1.15,
      geometricMeanLOS: 2.9,
      arithmeticMeanLOS: 3.2,
    },
    '177': {
      drgDescription: 'Respiratory Infections & Inflammations w MCC',
      basePaymentRate: 12500,
      totalPayment: 14375,
      outlierPayment: 0,
      capitalPayment: 1875,
      wage_index: 1.15,
      geometricMeanLOS: 6.8,
      arithmeticMeanLOS: 7.5,
    },
    '178': {
      drgDescription: 'Respiratory Infections & Inflammations w CC',
      basePaymentRate: 8200,
      totalPayment: 9430,
      outlierPayment: 0,
      capitalPayment: 1230,
      wage_index: 1.15,
      geometricMeanLOS: 5.1,
      arithmeticMeanLOS: 5.8,
    },
    '871': {
      drgDescription: 'Septicemia or Severe Sepsis w/o MV >96 Hours w MCC',
      basePaymentRate: 13800,
      totalPayment: 15870,
      outlierPayment: 0,
      capitalPayment: 2070,
      wage_index: 1.15,
      geometricMeanLOS: 5.9,
      arithmeticMeanLOS: 6.8,
    },
  }

  const drgData = mockData[drg] || {
    drgDescription: `DRG ${drg}`,
    basePaymentRate: 5000,
    totalPayment: 5750,
    outlierPayment: 0,
    capitalPayment: 750,
    wage_index: 1.15,
    geometricMeanLOS: 3.0,
    arithmeticMeanLOS: 3.5,
  }

  return {
    drg,
    ...drgData,
    success: true,
  }
}

/**
 * Calculate revenue impact between two DRGs
 */
export function calculateRevenueImpact(
  currentDRG: string,
  potentialDRG: string
): { revenueImpact: number; currentPayment: number; potentialPayment: number } {
  const currentPricing = getMockDRGPricing(currentDRG)
  const potentialPricing = getMockDRGPricing(potentialDRG)

  return {
    currentPayment: currentPricing.totalPayment,
    potentialPayment: potentialPricing.totalPayment,
    revenueImpact: potentialPricing.totalPayment - currentPricing.totalPayment,
  }
}
